import { Api } from "@banquette/api";
import { Pojo, Primitive, Type } from "@banquette/model";

let maxId = 0;

export abstract class AbstractBasicEntity {
    public localId: number = ++maxId;

    @Pojo(Primitive(Type.Number))
    @Api(Primitive(Type.Number))
    public id!: Number;

    // Untracked
    private flags: Record<string, boolean> = {};

    /**
     * Generic utility to mark the entity with a flag.
     */
    public markAs(flag: string, value: boolean|null = null) {
        this.flags[flag] = value === null ? !this.flags[flag] : value;
        this.flags = Object.assign({}, this.flags); // To help VueJS to view the change.
    }

    public toggleMarker(flag: string): void {
        this.markAs(flag, !this.isMarkedAs(flag));
    }

    public isMarkedAs(flag: string): boolean {
        return this.flags[flag];
    }
}
