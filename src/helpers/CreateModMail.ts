import { BaseInteraction, ChannelType } from "discord.js";
import { PrismaClient } from "@prisma/client";
import { env } from '../env';
export async function createModMailTicket(prisma: PrismaClient, interaction: BaseInteraction, ticketTopic: string, ticketTargetUser: string): Promise<void> {
    let ticketId = await prisma.modMailTicket.count();
    let mcChannel = await interaction.guild?.channels.fetch("1203141368537550910");
    let targetUser;
    try {
        targetUser = await interaction.guild?.members.fetch(ticketTargetUser)
    } catch (e) {
        // @ts-ignore
        interaction.reply({ content: "Failed to find user", ephemeral: true })
        return;
    }
    if (mcChannel?.type === ChannelType.GuildText) {
        let mmTicketChannel = await mcChannel.threads.create({
            name: `${targetUser?.user.username} - #${ticketId}`,
            type: 12,
            invitable: false,
        });
        let dbTicket = await prisma.modMailTicket.create({
            data: {
                threadId: mmTicketChannel.id,
                channelId: mcChannel.id,
                userId: interaction.user.id,
            },
        });
        mmTicketChannel.send({
            content: `${targetUser?.user}`,
            embeds: [{
                color: 5763719,
                title: `New Ticket ${ticketId}!`,
                description: `Mods will respond soon ❤️`,
                fields: [{ name: `Ticket Topic`, value: ticketTopic }],
                image: {
                    url: 'https://cdn.discordapp.com/attachments/756644176795533334/847276996564353054/Embed_width.png'
                },
                footer: {
                    text: `ID: ${dbTicket.id}`
                }
            }]
        });
        // @ts-ignore
        interaction.update({
            embeds: [],
            components: [{
                type: 1,
                components: [{
                    type: 2,
                    style: 5,
                    label: `Jump to Ticket`,
                    url: mmTicketChannel.url
                }]
            }],
            content: `Ticket created.`
        });

        let logChannel = interaction.guild?.channels.cache.get(env.GUILD_LOGGING_CHANNEL_ID)
        if (logChannel?.type === ChannelType.GuildText) {
            logChannel.threads.cache.get(env.TRHEAD_MML_ID)?.send({
                content: `+info ${targetUser?.user.id}`,
                embeds: [
                    {
                        title: 'New ModMail Ticket!',
                        color: 2895153,
                        fields: [
                            ...targetUser ? [{
                                name: 'User',
                                value: `<@${targetUser?.user.id}> (${targetUser?.user.id})`,
                                inline: true
                            }] : [],
                            ...ticketTopic ? [{
                                name: 'Topic',
                                value: ticketTopic,
                                inline: true
                            }] : []
                        ],
                        image: {
                            url: 'https://cdn.discordapp.com/attachments/756644176795533334/847276996564353054/Embed_width.png'
                        },
                        thumbnail: {
                            url: targetUser ? `${targetUser.displayAvatarURL()}` : ``
                        }
                    }
                ],
                components: [{
                    type: 1,
                    components: [
                        {
                            type: 2,
                            label: 'Jump to Ticket',
                            style: 5,
                            url: mmTicketChannel.url,
                        },
                    ]
                }]
            })
        }
    }
}