import { ChannelType, MessageContextMenuCommandInteraction } from "discord.js";
import { env } from "../../../env";
import { MessageCommand } from "../base";

export class MessageReport implements MessageCommand {
    name = "Report Message";
    type = 3;
    defer = true;
    ephemeral = true;

    public async execute(interaction: MessageContextMenuCommandInteraction) {
        if (interaction.targetMessage.member?.user.bot) {
            await interaction.editReply("You cannot report a bot message.");
            return;
        }
        let logChannel = interaction.guild?.channels.cache.get(env.GUILD_LOGGING_CHANNEL_ID)
        if (logChannel?.type === ChannelType.GuildText) {
            logChannel.threads.cache.get(env.TRHEAD_URQ_ID)?.send({
                embeds: [{
                    image: {
                        url: 'https://media.discordapp.net/attachments/1072902797999210506/1074879637718585344/report.png'
                    },
                    color: 2895153
                }, {
                    description: (`**Message Content:**\n${interaction.targetMessage.content}`).length >= 4096 ? (`**Message Content:**\n${interaction.targetMessage.content}`).slice(0, 4093) + '...' : (`**Message Content:**\n${interaction.targetMessage.content}`),
                    fields: [{
                        name: "Author",
                        value: `${interaction.targetMessage.author} (${interaction.targetMessage.author.id})`,
                        inline: true
                    }, {
                        name: "Channel",
                        value: `${interaction.targetMessage.channel} (${interaction.targetMessage.channel.id})`,
                        inline: true
                    }, {
                        name: 'Reported By',
                        value: `${interaction.user} (${interaction.user.id})`,
                    }],
                    color: 2895153,
                    image: {
                        url: 'https://cdn.discordapp.com/attachments/756644176795533334/847276996564353054/Embed_width.png'
                    },
                    thumbnail: {
                        url: interaction.targetMessage.author.displayAvatarURL()
                    }
                }],
                files: [
                    ...interaction.targetMessage.attachments.map(attachment => attachment.url)
                ],
                components: [{
                    type: 1,
                    components: [{
                        type: 2,
                        label: "Jump to Message",
                        style: 5,
                        url: interaction.targetMessage.url,
                    },
                    {
                        type: 2,
                        label: "Ignore",
                        style: 2,
                        custom_id: `custom_MSGI`,
                    },
                    ]
                }, {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            label: "Approve",
                            style: 3,
                            custom_id: `custom_MSGA`,
                        },
                        {
                            type: 2,
                            label: "Delete Message",
                            style: 4,
                            custom_id: `custom_MSGD_${interaction.targetMessage.channelId}_${interaction.targetMessage.id}`,
                        },
                    ]
                }]
            }
            ).then(async () => {
                await interaction.editReply("Message Reported to the Moderation Team!");
            })
        }
    }
}