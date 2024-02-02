import { ButtonInteraction } from 'discord.js';
import { Button } from '../base';
import axios from 'axios';
import { env } from 'env';
import { PrismaClient } from '@prisma/client';


export class MarketplaceApply implements Button {
    custom_id = 'marketplace_apply_button';
    public async execute(interaction: ButtonInteraction, prisma: PrismaClient) {
        await interaction.deferReply({ ephemeral: true });
        let testForUser = await prisma.marketplaceApplicant.findUnique({
            where: {
                id: interaction.user.id
            }
        })
        if (testForUser === null || testForUser.lastApplication < new Date(Date.now() - 600000)) {
            logicOrSomethingIDK(interaction, prisma)
        } else {
            await interaction.editReply({
                embeds: [
                    {
                        image: {
                            url: 'https://media.discordapp.net/attachments/1072902797999210506/1072904224473624657/Marketplace.png'
                        },
                        color: 15548997
                    },
                    {
                        title: 'Marketplace Verification Application',
                        description: `You have already pressed this button in the last 10 minutes.\nPlease try again <t:${Math.floor(new Date(testForUser.lastApplication.getTime() + 600000).getTime() / 1000)}:R>`,
                        color: 15548997,
                        image: {
                            url: 'https://cdn.discordapp.com/attachments/756644176795533334/847276996564353054/Embed_width.png'
                        }
                    }
                ],
            })
        }
    }
}

async function fetchData(interaction: ButtonInteraction) {
    const [result1, result2] = await Promise.all([
        axios.get(`https://discord.com/api/v9/guilds/${interaction?.guildId}/messages/search?author_id=${interaction?.user.id}`, {
            headers: {
                authorization: env.DISCORD_CLIENT_TOKEN,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78",
                "referer": `https://discord.com/channels/${interaction?.guildId}/${interaction?.channelId}`
            }
        }),
        interaction.guild?.members.fetch(interaction.user.id)
    ]);

    return [await result1.data?.total_results || 0, result2?.joinedAt];
}

async function logicOrSomethingIDK(interaction: ButtonInteraction, prisma: PrismaClient) {
    await interaction.editReply({
        embeds: [
            {
                "color": 3092790,
                "image": {
                    "url": "https://media.discordapp.net/attachments/1072902797999210506/1072910191823171665/Marketplace_Requirements.png"
                }
            },
            {
                "title": "Marketplace Verification Application",
                "color": 3092790,
                "description": "Please wait while we check your eligibility for the marketplace.",
                "image": {
                    "url": "https://cdn.discordapp.com/attachments/756644176795533334/847276996564353054/Embed_width.png"
                }
            }
        ]
    })
    await prisma.marketplaceApplicant.upsert({
        where: {
            id: interaction.user.id
        },
        update: {
            lastApplication: new Date()
        },
        create: {
            id: interaction.user.id,
        }
    })
    const data = await fetchData(interaction);
    let messageResults = data[0];
    let currentDate = new Date();
    let joinedAt = data[1] || currentDate;
    let timeDiff = currentDate.getTime() - joinedAt.getTime();
    let daysDiff = timeDiff / (1000 * 60 * 60 * 24)
    let hasMessages = messageResults <= 100;
    let isOlder = daysDiff < 30;
    if (hasMessages || isOlder) {
        await interaction.editReply({
            content: null,
            embeds: [
                {
                    "color": 3092790,
                    "image": {
                        "url": "https://media.discordapp.net/attachments/1072902797999210506/1072910191823171665/Marketplace_Requirements.png"
                    }
                },
                {
                    "title": "Marketplace Application Requirements",
                    "description": "You do not meet one or more of the [requirements](https://discord.com/channels/725241819960705154/1072912875628269648/ 'Marketplace Verification Requirements') to be able to apply for verification status.",
                    "color": 3092790,
                    "image": {
                        "url": "https://cdn.discordapp.com/attachments/756644176795533334/847276996564353054/Embed_width.png"
                    }
                },
                ...hasMessages ? [{
                    "title": "Message Requirement",
                    "description": `Members must have a minimum of 100 messages on the discord server in order to apply for verified marketplace poster status.\n\nYou Currently have **${messageResults} Messages**.`,
                    "color": 3092790,
                    "image": {
                        "url": "https://cdn.discordapp.com/attachments/756644176795533334/847276996564353054/Embed_width.png"
                    }
                }] : [],
                ...isOlder ? [{
                    "title": "Membership Duration Requirement",
                    "description": `In order to become a verified marketplace poster, members must be a part of the discord server for at least 30 days.\n\nYou've been a member for **${Math.floor(daysDiff)} Days**.`,
                    "color": 3092790,
                    "image": {
                        "url": "https://cdn.discordapp.com/attachments/756644176795533334/847276996564353054/Embed_width.png"
                    }
                }] : []
            ],
        });
        return;
    } else {
        await interaction.editReply({
            content: null,
            embeds: [
                {
                    "color": 3092790,
                    "image": {
                        "url": "https://media.discordapp.net/attachments/1072902797999210506/1072910191823171665/Marketplace_Requirements.png"
                    }
                },
                {
                    "title": "Marketplace Verification Application",
                    "color": 3092790,
                    "description": "Congratulations! You meet all of the requirements to apply for verified marketplace poster status.\n\nPlease click the button below to fill out the form in order to apply for verification status.",
                    "image": {
                        "url": "https://cdn.discordapp.com/attachments/756644176795533334/847276996564353054/Embed_width.png"
                    }
                }
            ],
            components: [{
                type: 1,
                components: [{
                    type: 2,
                    label: 'Application Form',
                    style: 3,
                    custom_id: 'marketplace_showForm'
                }]
            }]
        })
    }
}