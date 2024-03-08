import { ChatInputCommandInteraction } from "discord.js";
import { SlashCommand } from "../base";

// This is so fucking scuffed

export class Close implements SlashCommand {
    name = "close";
    description = "Close ticket";
    options = [];
    type = 1;
    defer = true;
    ephemeral = true;

    public async execute(interaction: ChatInputCommandInteraction) {
        if (interaction.channel?.isThread()) {
            if (interaction.channel.parentId === "1203141368537550910") {
                await interaction.editReply("Closing ticket...");
                try {
                    await interaction.channel.send({
                        embeds: [{
                            title: 'Ticket Closed',
                            description: `The ticket has been closed by ${interaction.user}.`,
                            color: 15548997,
                            image: {
                                url: 'https://cdn.discordapp.com/attachments/756644176795533334/847276996564353054/Embed_width.png'
                            }
                        }]
                    })
                    await interaction.channel.edit({
                        locked: true,
                        archived: true
                    })
                } catch (error) {
                    await interaction.editReply("Closing ticket failed, is ticket already closed?")
                }
            } else {
                await interaction.editReply("This command can only be used in ModMail tickets.");
            }
        } else {
            await interaction.editReply("This command can only be used in ModMail tickets.");
        }
    }
}