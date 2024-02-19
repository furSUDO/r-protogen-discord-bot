import { AnySelectMenuInteraction, ChannelType } from "discord.js";
import { SelectMenu } from "../base";
import { PrismaClient } from "@prisma/client";

export class ModContactWizardSelectMenu implements SelectMenu {
    custom_id = "mc_wiz_select";
    public async execute(interaction: AnySelectMenuInteraction, prisma: PrismaClient) {
        if (!interaction.isStringSelectMenu()) return;
        interaction.values
        switch (interaction.values[0]) {
            case "mcw_modmail":
                //TODO - implement modmail
                let ticketId = await prisma.modMailTicket.count()
                let mcChannel = await interaction.guild?.channels.fetch(interaction.channelId)
                if (mcChannel?.type === ChannelType.GuildText) {
                    let mmTicketChannel = await mcChannel.threads.create(
                        {
                            name: `${interaction.user.username} - #${ticketId}`,
                            type: 12,
                            invitable: false,
                        }
                    )
                    let dbTicket = await prisma.modMailTicket.create({
                        data: {
                            threadId: mmTicketChannel.id,
                            channelId: mcChannel.id,
                            userId: interaction.user.id
                        }
                    })
                    mmTicketChannel.send({
                        content: `${interaction.user}`,
                        embeds: [
                            {
                                color: 5763719,
                                title: `New Ticket ${ticketId}!`,
                                description: `New ticket created. please send info here, mods will respons soon <3`,
                                image: {
                                    url: 'https://cdn.discordapp.com/attachments/756644176795533334/847276996564353054/Embed_width.png'
                                },
                                footer: {
                                    text: `id: ${dbTicket.id}`
                                }
                            }
                        ]
                    })
                    interaction.update({
                        embeds: [], components: [
                            {
                                type: 1,
                                components: [
                                    {
                                        type: 2,
                                        style: 5,
                                        label: `Jump to Ticket`,
                                        url: mmTicketChannel.url
                                    }
                                ]
                            }
                        ],
                        content: `placeholder.`
                    })

                };



                interaction.channel

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