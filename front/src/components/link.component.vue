<script lang="ts">
import { Component, Prop, Computed } from "@banquette/vue-typescript";
@Component({
    name: 'bt-link',
    components: [],
})
export default class Link {
    @Prop({ type: String, default: null}) public route!: string|null;
    @Prop({ type: String, default: null}) public href!: string|null;
    @Prop({ type: String, default: null}) public activeCss!: string|null;
    @Prop({ type: Boolean, default: false}) public current!: boolean;

    @Computed() public get containerType(): 'a' | 'span' | 'router-link' {
        return this.route ? 'router-link' : (this.href ? 'a' : 'span');
    }
}
</script>

<template>
    <component
        :is="containerType"
        :to="route ? {name: route} : undefined"
        :href="href"
        :class="[
            (containerType !== 'span' ? 'cursor-pointer' : ''),
            (activeCss || `data-[current]`)
        ].join(' ')"
        :data-current="current ? '' : null"
    >
        <slot></slot>
    </component>
</template>
