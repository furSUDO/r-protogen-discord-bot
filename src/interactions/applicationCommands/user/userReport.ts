import { ChannelType, UserContextMenuCommandInteraction } from "discord.js";
import { env } from "../../../env";
import { UserCommand } from "../base";

export class UserReport implements UserCommand {
    name = "Report User";
    type = 2;
    defer = true;
    ephemeral = true;

    public async execute(interaction: UserContextMenuCommandInteraction) {
        if (interaction.targetMember?.user.bot) {
            await interaction.editReply("You cannot report a bot.");
            return;
        }
        let logChannel = interaction.guild?.channels.cache.get(env.GUILD_LOGGING_CHANNEL_ID)
        if (logChannel?.type === ChannelType.GuildText) {
            logChannel.threads.cache.get(env.TRHEAD_URQ_ID)?.send({
                embeds: [{
                    image: {
                        url: 'https://media.discordapp.net/attachments/1072902797999210506/1074879637718585344/report.png'
                    },
                    color: 3092790
                }, {
                    fields: [{
                        name: "User",
                        value: `${interaction.targetMember?.user} (${interaction.targetMember?.user.id})`,
                        inline: true
                    }, {
                        name: 'Reported By',
                        value: `${interaction.user} (${interaction.user.id})`,
                    }],
                    color: 3092790,
                    image: {
                        url: 'https://cdn.discordapp.com/attachments/756644176795533334/847276996564353054/Embed_width.png'
                    },
                    thumbnail: {
                        url: `${interaction.targetUser.avatarURL()}`
                    }
                }],
                components: [{
                    type: 1,
                    components: [{
                        type: 2,
                        label: "View User Profile",
                        style: 5,
                        url: `https://discord.com/users/${interaction.targetUser.id}`,
                    },
                    {
                        type: 2,
                        label: "Ignore",
                        style: 2,
                        custom_id: `custom_UCMI`,
                    },
                    ]
                }, {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            label: "Approve",
                            style: 3,
                            custom_id: `custom_UCMA`,
                        },
                        {
                            type: 2,
                            label: "Ban User",
                            style: 4,
                            custom_id: `custom_UCMB_${interaction.targetUser.id}`,
                        },
                    ]
                }]
            }
            ).then(async () => {
                await interaction.editReply("User Reported to the Moderation Team!");
            })
        }
    }
}