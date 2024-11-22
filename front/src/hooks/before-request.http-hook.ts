import { Injector } from "@banquette/dependency-injection";
import { EventDispatcherService } from "@banquette/event";
import { HttpEvents, RequestEvent } from "@banquette/http";

Injector.Get(EventDispatcherService).subscribe(HttpEvents.BeforeRequest, (event: RequestEvent) => {
    event.request.headers.set('Accept', 'application/json');
});
