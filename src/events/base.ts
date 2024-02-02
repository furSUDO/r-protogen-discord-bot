import { Client } from "discord.js";

export class BaseEvent {
    name: string;
    once?: boolean;
    constructor(name: string, once?: boolean) {
        this.name = name;
        this.once = once;
    }
    async execute(...args: any) {
        throw new Error(`The execute method has not been implemented in ${this.name}`);
    }
}

export interface Event extends BaseEvent {
    name: string;
    once?: boolean;
    execute(client: Client, ...args: any): Promise<void>;
}