import { ChatInputCommandInteraction } from "discord.js";
import { SlashCommand } from "../base";

export class Ping implements SlashCommand {
    name = "ping";
    description = "Ping pong!";
    options = [];
    type = 1;
    defer = true;
    ephemeral = true;

    public async execute(interaction: ChatInputCommandInteraction) {
        await interaction.editReply("Pong!");
    }
}