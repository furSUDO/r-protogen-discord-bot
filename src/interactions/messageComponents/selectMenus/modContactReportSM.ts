import { AnySelectMenuInteraction } from "discord.js";
import { SelectMenu } from "../base";

export class ModContactReportSM implements SelectMenu {
    custom_id = "mcw_report_user";
    public async execute(interaction: AnySelectMenuInteraction) {
        if (!interaction.isUserSelectMenu()) return;
        if (interaction.users.get(interaction.user.id)) {
            console.log(`U STUPID`);
            interaction.update({
                embeds: [
                    {
                        title: 'User Report',
                        description: `You cannot report yourself. (dummy)`,
                        color: 15548997,
                        image: {
                            url: 'https://cdn.discordapp.com/attachments/756644176795533334/847276996564353054/Embed_width.png'
                        }
                    }
                ],
                components: []
            })
            return;
        }
        interaction.update({
            embeds: [
                {
                    title: 'User Report',
                    description: `You are reporting ${interaction.users.first()}, what would you like to report them for?`,
                    color: 15548997,
                    image: {
                        url: 'https://cdn.discordapp.com/attachments/756644176795533334/847276996564353054/Embed_width.png'
                    }
                },
            ],
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 3,
                            custom_id: `customsm_mcwru_${interaction.users.first()?.id}`,
                            options: [
                                {
                                    label: "harassment",
                                    description: "Harassment",
                                    value: "mcr_har"
                                },
                                {
                                    label: "Scam",
                                    description: "This user appears to be scamming people.",
                                    value: "mcr_scam"
                                }
                            ]
                        }
                    ]
                }
            ]
        })
    }
}