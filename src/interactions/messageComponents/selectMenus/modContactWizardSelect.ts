import { AnySelectMenuInteraction, ChannelType } from "discord.js";
import { SelectMenu } from "../base";
import { PrismaClient } from "@prisma/client";
import { createModMailTicket } from "../../../helpers/CreateModMail";

export class ModContactWizardSelectMenu implements SelectMenu {
    custom_id = "mc_wiz_select";
    public async execute(interaction: AnySelectMenuInteraction, prisma: PrismaClient) {
        if (!interaction.isStringSelectMenu()) return;
        interaction.values
        switch (interaction.values[0]) {
            case "mcw_modmail":
                // createModMailTicket(prisma,interaction,"New Ticket", interaction.user.id)
                await interaction.showModal({
                    title: 'Open a ModMail Ticket',
                    custom_id: 'mc_new_modmail',
                    components: [
                        {
                            type: 1,
                            components: [
                                {
                                    type: 4,
                                    label: 'Why are you opening this ticket?',
                                    custom_id: 'ticket_reason',
                                    style: 2,
                                    min_length: 1,
                                    max_length: 2048,
                                    required: true
                                },
                            ]
                        },
                    ]
                })
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