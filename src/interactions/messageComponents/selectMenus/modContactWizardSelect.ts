import { AnySelectMenuInteraction } from "discord.js";
import { SelectMenu } from "../base";

export class ModContactWizardSelectMenu implements SelectMenu {
    custom_id = "mc_wiz_select";
    public async execute(interaction: AnySelectMenuInteraction) {
        if (!interaction.isStringSelectMenu()) return;
        interaction.values
        switch (interaction.values[0]) {
            case "mcw_modmail":
                //TODO - implement modmail
                console.debug('modmail');

                break;
            case "mcw_report":
                //TODO - implement report
                interaction.update({
                    embeds: [
                        {
                            title: 'User Report',
                            description: `You have selected to report a user, please type their name in the box below.`,
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
                                    type: 5,
                                    custom_id: "mcw_report_user"
                                }
                            ]
                        }
                    ]
                })
                break;

            default:
                break;
        }
    }
}