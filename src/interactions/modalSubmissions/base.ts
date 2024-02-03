import { PrismaClient } from "@prisma/client";
import { ModalSubmitInteraction } from "discord.js";

export class BaseModalSubmission {
    custom_id: string;
    custom_id_localizations?: string[];
    constructor(custom_id: string, custom_id_localizations?: string[], type?: number) {
        this.custom_id = custom_id;
        this.custom_id_localizations = custom_id_localizations;
    }
    async execute(interaction: ModalSubmitInteraction, prisma: PrismaClient) {
        throw new Error("Method not implemented.");
    }
}

export interface Submission extends BaseModalSubmission {
    custom_id: string;
    execute(interaction: ModalSubmitInteraction, prisma: PrismaClient): Promise<void>;
}