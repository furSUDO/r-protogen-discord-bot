import { Client } from "discord.js";
import { loadEnv, env } from "./env";
loadEnv();
import { PrismaClient } from '@prisma/client'
import { registerEvents } from "./events";

// Create a new Prisma Client
const prisma = new PrismaClient()
// Create a new Discord Client with intents 1148655 - https://discord-intents-calculator.vercel.app/ (great tool)
const client = new Client({
    intents: 33283,
});
// Initialize the events
registerEvents(client, prisma);
// Login to Discord with your client's token
client.login(env.DISCORD_APPLICATION_TOKEN);