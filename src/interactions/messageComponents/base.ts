import { PrismaClient } from "@prisma/client";
import { ButtonInteraction, MessageComponentInteraction } from "discord.js";

export class BaseMessageComponent {
    custom_id: string;
    custom_id_localizations?: string[];
    type?: number;
    constructor(custom_id: string, custom_id_localizations?: string[], type?: number) {
        this.custom_id = custom_id;
        this.custom_id_localizations = custom_id_localizations;
        this.type = type;
    }
    async execute(interaction: MessageComponentInteraction, prisma: PrismaClient): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export interface Button extends BaseMessageComponent {
    custom_id: string;
    execute(interaction: ButtonInteraction, prisma: PrismaClient): Promise<void>;
}