import { PrismaClient } from "@prisma/client";
import { Client } from "discord.js";
import { BaseEvent } from "./base";
import InteractionCreate from "./interactionCreate";
import { ClientEvents } from "./ClientEvents";

export const Events: Array<BaseEvent> = [
    new InteractionCreate,
    ...ClientEvents
];

export async function registerEvents(client: Client, prisma: PrismaClient) {
    for (const event of Events) {
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, prisma));
            console.log(`Registered event ${event.name} to run once.`);
        } else {
            client.on(event.name, (...args) => event.execute(...args, prisma))
            console.log(`Registered event ${event.name} to run on every occurence.`);
        }
    }
}
