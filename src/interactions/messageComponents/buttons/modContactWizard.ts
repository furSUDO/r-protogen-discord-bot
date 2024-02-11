import { ButtonInteraction } from 'discord.js';
import { Button } from '../base';


export class ModContactWizard implements Button {
    custom_id = 'modcontact_wizard_button';
    public async execute(interaction: ButtonInteraction) {
        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({
            embeds: [
                {
                    title: 'Mod Contact Wizard',
                    description: `Using the dropdown below, select how you would like to proceed.`,
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
                            custom_id: "mc_wiz_select",
                            options: [
                                {
                                    label: "Modmail",
                                    value: "mcw_modmail",
                                    description: "Get in contact with the mod team.",
                                    emoji: {
                                        name: "🛡️"
                                    }
                                },
                                {
                                    label: "Report Member",
                                    value: "mcw_report",
                                    description: "Notify the mod team about troublesome members.",
                                    emoji: {
                                        name: "❗"
                                    }
                                },
                            ],
                            placeholder: "",
                            min_values: 1,
                            max_values: 1
                        }
                    ]
                }
            ]
        })
    }
}
