import { ButtonInteraction, ChannelType, Embed, Message } from 'discord.js';
import { Button } from '../base';
import { env } from '../../../env';


export class Custom implements Button {
    custom_id = 'custom_';
    public async execute(interaction: ButtonInteraction) {
        if (!interaction.isButton()) return;
        await interaction.deferReply({ ephemeral: true })
        const args = interaction.customId.split('_');
        switch (args[1]) {
            case 'MPQA':
                MPQA(interaction, args)
                break;

            case 'MPQD':
                MPQD(interaction, args)
                break;

            case 'MSGD':
                MSGD(interaction, args)
                break;

            case 'MSGI':
                MSGI(interaction, args)
                break;

            case 'MSGA':
                MSGA(interaction, args)
                break;

            case 'UCMA':
                UCMA(interaction, args)
                break;

            case 'UCMI':
                UCMI(interaction, args)
                break;

            case 'UCMB':
                UCMB(interaction, args)
                break;

            default:
                await interaction.editReply({ content: `This interaction has not been implimented on the production version.` });
                break;
        }
    }
}
// Markeplace Queue Approve Button
async function MPQA(interaction: ButtonInteraction, args: Array<string>) {
    await interaction.guild?.channels.fetch(interaction.message.channelId)
    await interaction.message.edit({ components: [] })
    let embeds = [interaction.message.embeds[0].data, interaction.message.embeds[1].data]
    interaction.guild?.members.fetch(args[2]).then(async member => {
        await member.roles.add(env.MARKETPLACE_VERIFIED_ROLE_ID)
        await interaction.guild?.channels.fetch(env.MARKETPLACE_INFO_CHANNEL_ID).then(async channel => {
            if (channel?.type === ChannelType.GuildText) {
                channel.threads.create({
                    name: `${member.displayName}'s Marketplace Thread`,
                    type: ChannelType.PrivateThread,
                }).then(async thread => {
                    await thread.send({
                        content: `<@${member.user.id}>`,
                        embeds: [
                            {
                                color: 5763719,
                                image: {
                                    url: 'https://media.discordapp.net/attachments/1072902797999210506/1072904224473624657/Marketplace.png'
                                }
                            },
                            {
                                color: 5763719,
                                description: `your Verified Marketplace Poster request has been approved!\nYou can now post in <#1072906792641773629>!`,
                                title: 'Approved!',
                                image: {
                                    url: 'https://cdn.discordapp.com/attachments/756644176795533334/847276996564353054/Embed_width.png'
                                }
                            }
                        ]
                    }).then(async message => {
                        embeds[1].fields?.push({
                            name: 'Status',
                            value: `[Approved](${message.url}) by <@${interaction.user.id}> (${interaction.user.id})`,
                        })
                        // @ts-ignore
                        embeds[0].color = 5763719;
                        // @ts-ignore
                        embeds[1].color = 5763719;

                        await interaction.message.edit({
                            embeds: embeds,
                        })
                    })
                }).catch(async error => {
                    await interaction.editReply({ content: `Thread Create Error: ${error}` });
                    return;
                })
            }
        })
        await interaction.editReply({ content: `Request Approved!` });
    })
}
// Marketplace Queue Deny Button
async function MPQD(interaction: ButtonInteraction, args: Array<string>) {
    await interaction.guild?.channels.fetch(interaction.message.channelId)
    await interaction.message.edit({ components: [] })
    let embeds = [interaction.message.embeds[0].data, interaction.message.embeds[1].data]
    interaction.guild?.members.fetch(args[2]).then(async member => {
        await interaction.guild?.channels.fetch(env.MARKETPLACE_INFO_CHANNEL_ID).then(async channel => {
            if (channel?.type === ChannelType.GuildText) {
                channel.threads.create({
                    name: `${member.displayName}'s Marketplace Thread`,
                    type: ChannelType.PrivateThread,
                }).then(async thread => {
                    await thread.send({
                        content: `<@${member.user.id}>`,
                        embeds: [
                            {
                                color: 15548997,
                                image: {
                                    url: 'https://media.discordapp.net/attachments/1072902797999210506/1072904224473624657/Marketplace.png'
                                }
                            },
                            {
                                color: 15548997,
                                description: `your Verified Marketplace Poster request has been Denied!\nYou may re-apply after some time in <#1072906769069772840>!`,
                                title: 'Denied!',
                                image: {
                                    url: 'https://cdn.discordapp.com/attachments/756644176795533334/847276996564353054/Embed_width.png'
                                }
                            }
                        ]
                    }).then(async message => {
                        embeds[1].fields?.push({
                            name: 'Status',
                            value: `[Denied](${message.url}) by <@${interaction.user.id}> (${interaction.user.id})`,
                        })
                        // @ts-ignore
                        embeds[0].color = 15548997;
                        // @ts-ignore
                        embeds[1].color = 15548997;

                        await interaction.message.edit({
                            embeds: embeds,
                        })
                    })
                }).catch(async error => {
                    await interaction.editReply({ content: `Thread Create Error: ${error}` });
                    return;
                })
            }
        })
        await interaction.editReply({ content: `Request Denied!\nConsider adding a reason in ${member.displayName}'s thread.` });
    })
}

// Message Delete Button
async function MSGD(interaction: ButtonInteraction, args: Array<string>) {
    let embeds = [interaction.message.embeds[0].data, interaction.message.embeds[1].data]
    await interaction.message.edit({ components: [] })
    let guildChannel = interaction.guild?.channels.cache.get(args[2])
    if (guildChannel?.isTextBased()) {
        embeds[1].fields?.push({
            name: 'Status',
            value: `Message Deleted by <@${interaction.user.id}> (${interaction.user.id})`,
        })
        // @ts-ignore
        embeds[0].color = 15548997;
        // @ts-ignore
        embeds[1].color = 15548997;
        await guildChannel.messages.delete(args[3]).then(async () => {
            await interaction.editReply({ content: `Message Deleted!` });
        }).catch(async () => {
            await interaction.editReply({ content: `Message Delete Error!\nPossibly already deleted.` });
        })
        await interaction.message.edit({ embeds: embeds })
    }
}

// Message Ignore Button
async function MSGI(interaction: ButtonInteraction, args: Array<string>) {
    let embeds = [interaction.message.embeds[0].data, interaction.message.embeds[1].data]
    await interaction.message.edit({
        components: [{
            type: 1,
            components: [{
                type: 2,
                style: 5,
                label: 'Jump to Message',
                // @ts-ignore
                url: interaction.message.components[0].components[0].data?.url,
            }]
        }]
    })
    embeds[1].fields?.push({
        name: 'Status',
        value: `Report Ignored by <@${interaction.user.id}> (${interaction.user.id})`,
    })
    // @ts-ignore
    embeds[0].color = 16705372;
    // @ts-ignore
    embeds[1].color = 16705372;
    await interaction.message.edit({ embeds: embeds })
    await interaction.editReply({ content: `Report Ignored!` });
}

// Message Approve Button
async function MSGA(interaction: ButtonInteraction, args: Array<string>) {
    let embeds = [interaction.message.embeds[0].data, interaction.message.embeds[1].data]
    await interaction.message.edit({
        components: [{
            type: 1,
            components: [{
                type: 2,
                style: 5,
                label: 'Jump to Message',
                // @ts-ignore
                url: interaction.message.components[0].components[0].data?.url,
            }]
        }]
    })
    embeds[1].fields?.push({
        name: 'Status',
        value: `Report Approved by <@${interaction.user.id}> (${interaction.user.id})`,
    })
    // @ts-ignore
    embeds[0].color = 5763719;
    // @ts-ignore
    embeds[1].color = 5763719;
    await interaction.message.edit({ embeds: embeds })
    await interaction.editReply({ content: `Report Approved!` });
}

// User Ban Button
async function UCMB(interaction: ButtonInteraction, args: Array<string>) {
    let embeds = [interaction.message.embeds[0].data, interaction.message.embeds[1].data]
    await interaction.message.edit({ components: [] })
    let guildMember = interaction.guild?.members.cache.get(args[2])
    if (guildMember) {
        await guildMember.send({
            content: `You have been banned from ${interaction.guild?.name}!\nYou may appeal your ban by going to https://discord.gg/HWzRypN3wq!`,
        }).catch(async () => {
            await interaction.followUp({ content: `User DM Error!`, ephemeral: true });
        })
        embeds[1].fields?.push({
            name: 'Status',
            value: `User Banned by <@${interaction.user.id}> (${interaction.user.id})`,
        })
        // @ts-ignore
        embeds[0].color = 15548997;
        // @ts-ignore
        embeds[1].color = 15548997;
        await guildMember.ban({ reason: `User Banned by <@${interaction.user.username}> (${interaction.user.id})` }).then(async () => {
            await interaction.message.edit({ embeds: embeds })
            await interaction.editReply({ content: `User Banned!` });
        }).catch(async e => {
            await interaction.message.edit({ embeds: embeds })
            await interaction.editReply({
                content: `User Ban Error!`, embeds: [{
                    title: 'Error',
                    description: JSON.stringify(e.rawError.message),
                }]
            });
        })
    }
}

// User Ignore Button
async function UCMI(interaction: ButtonInteraction, args: Array<string>) {
    let embeds = [interaction.message.embeds[0].data, interaction.message.embeds[1].data]
    await interaction.message.edit({
        components: [{
            type: 1,
            components: [{
                type: 2,
                style: 5,
                label: 'View User Profile',
                // @ts-ignore
                url: interaction.message.components[0].components[0].data?.url,
            }]
        }]
    })
    embeds[1].fields?.push({
        name: 'Status',
        value: `User Ignored by <@${interaction.user.id}> (${interaction.user.id})`,
    })
    // @ts-ignore
    embeds[0].color = 16705372;
    // @ts-ignore
    embeds[1].color = 16705372;
    await interaction.message.edit({ embeds: embeds })
    await interaction.editReply({ content: `User Ignored!` });
}

// User Approve Button
async function UCMA(interaction: ButtonInteraction, args: Array<string>) {
    let embeds = [interaction.message.embeds[0].data, interaction.message.embeds[1].data]
    await interaction.message.edit({
        components: [{
            type: 1,
            components: [{
                type: 2,
                style: 5,
                label: 'View User Profile',
                // @ts-ignore
                url: interaction.message.components[0].components[0].data?.url,
            }]
        }]
    })
    embeds[1].fields?.push({
        name: 'Status',
        value: `User Approved by <@${interaction.user.id}> (${interaction.user.id})`,
    })
    // @ts-ignore
    embeds[0].color = 5763719;
    // @ts-ignore
    embeds[1].color = 5763719;
    await interaction.message.edit({ embeds: embeds })
    await interaction.editReply({ content: `User Approved!` });
}