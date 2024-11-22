function stripRgb(input) {
    return input.substring(input.indexOf('(') + 1, input.indexOf(')'));
}

function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? ('rgb('+
        parseInt(result[1], 16) + ',' +
        parseInt(result[2], 16) + ',' +
        parseInt(result[3], 16) +
        ')') : null;
}

function hslToRgb(input){
    var res = /hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/.exec(input).slice(1);
    var h = res[0], s = res[1], l = res[2];
    console.log([h, s, l]);

    var r, g, b;
    if(s === 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return Math.round(r * 255) +','+ Math.round(g * 255)+','+Math.round(b * 255);
}

function HSLAToRGBA(hsla,isPct) {
    let ex = /^hsla\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)(((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2},\s?)|((\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}\s\/\s))((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;
    if (ex.test(hsla)) {
        let sep = hsla.indexOf(",") > -1 ? "," : " ";
        hsla = hsla.substr(5).split(")")[0].split(sep);

        // strip the slash if using space-separated syntax
        if (hsla.indexOf("/") > -1)
            hsla.splice(3,1);

        isPct = isPct === true;

        // must be fractions of 1
        let h = hsla[0],
            s = hsla[1].substr(0,hsla[1].length-1) / 100,
            l = hsla[2].substr(0,hsla[2].length-1) / 100,
            a = hsla[3];

        // strip label and convert to degrees (if necessary)
        if (h.indexOf("deg") > -1)
            h = h.substr(0,h.length - 3);
        else if (h.indexOf("rad") > -1)
            h = Math.round(h.substr(0,h.length - 3) / (2 * Math.PI) * 360);
        else if (h.indexOf("turn") > -1)
            h = Math.round(h.substr(0,h.length - 4) * 360);
        if (h >= 360)
            h %= 360;

        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = l - c/2,
            r = 0,
            g = 0,
            b = 0;

        if (0 <= h && h < 60) {
            r = c; g = x; b = 0;
        } else if (60 <= h && h < 120) {
            r = x; g = c; b = 0;
        } else if (120 <= h && h < 180) {
            r = 0; g = c; b = x;
        } else if (180 <= h && h < 240) {
            r = 0; g = x; b = c;
        } else if (240 <= h && h < 300) {
            r = x; g = 0; b = c;
        } else if (300 <= h && h < 360) {
            r = c; g = 0; b = x;
        }

        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        let pctFound = a.indexOf("%") > -1;

        if (isPct) {
            r = +(r / 255 * 100).toFixed(1);
            g = +(g / 255 * 100).toFixed(1);
            b = +(b / 255 * 100).toFixed(1);
            if (!pctFound) {
                a *= 100;
            } else {
                a = a.substr(0,a.length - 1);
            }

        } else if (pctFound) {
            a = a.substr(0,a.length - 1) / 100;
        }

        return "rgba("+ (isPct ? r + "%," + g + "%," + b + "%," + a + "%" : +r + ","+ +g + "," + +b + "," + +a) + ")";

    } else {
        return "Invalid input color";
    }
}

function fetchValue(container, path) {
    const part = path.shift();
    if (!part || typeof(container) !== 'object') {
        return undefined;
    }
    if (!path.length) {
        return container[part];
    }
    return fetchValue(container[part], path);
}

function resolveRgbColors(input, root) {
    for (const k of Object.keys(input)) {
        const v = input[k];
        if (typeof(v) === 'object') {
            resolveRgbColors(input[k], root || input);
        } else if (typeof(v) === 'string' && v.length > 0 && v[0] === '%') {
            const raw = fetchValue(root, v.substring(1).split('.'));
            const method = raw.substring(0, 3) === 'hsl' ? HSLAToRGBA : hexToRgb;
            input[k] = method(raw);
            if (input[k].substring(0, 4) === 'rgb(') {
                input[k] = stripRgb(input[k]);
            }
        }
    }
}

function finalize(config) {
    resolveRgbColors(config);
    return config;
}

module.exports = {finalize: finalize, stripRgb: stripRgb};
