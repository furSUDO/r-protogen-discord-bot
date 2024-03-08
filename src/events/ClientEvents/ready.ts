import { PrismaClient } from "@prisma/client";
import { ChannelType, Client } from "discord.js";
import { applicationCommands } from "../../interactions";
import { BaseEvent } from "../base";

export default class Ready implements BaseEvent {
    public name = 'ready';
    public once = true;

    public async execute(client: Client, prisma: PrismaClient) {
        console.log(`Ready! Logged in as ${client?.user?.tag}`);
        // @ts-ignore
        // client.application?.commands.set(applicationCommands)
        client.guilds.cache.get('725241819960705154')?.commands.set(applicationCommands)
    }
}