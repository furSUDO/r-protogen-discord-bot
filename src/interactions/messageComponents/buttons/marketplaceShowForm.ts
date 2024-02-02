import { PrismaClient } from "@prisma/client";
import { ButtonInteraction } from "discord.js";
import { Button } from "../base";

export class MarketplaceShowForm implements Button {
    custom_id = 'marketplace_showForm';
    public async execute(interaction: ButtonInteraction, prisma: PrismaClient) {
        let testForUser = await prisma.marketplaceApplicant.findUnique({
            where: {
                id: interaction.user.id
            }
        })
        if (testForUser?.lastFormSent) {
            if (testForUser?.lastFormSent > new Date(Date.now() - 6.048e+8)) {
                interaction.reply({
                    embeds: [
                        {
                            image: {
                                url: 'https://media.discordapp.net/attachments/1072902797999210506/1072904224473624657/Marketplace.png'
                            },
                            color: 15548997
                        },
                        {
                            title: 'Marketplace Verification Application',
                            description: `You have already pressed this button in the last 7 days.\nPlease try again <t:${Math.floor(new Date(testForUser.lastFormSent.getTime() + 6.048e+8).getTime() / 1000)}:R>.`,
                            color: 15548997,
                            image: {
                                url: 'https://cdn.discordapp.com/attachments/756644176795533334/847276996564353054/Embed_width.png'
                            }
                        }
                    ],
                    ephemeral: true
                })
            } else {
                showTheModal(interaction)
            }
        } else {
            showTheModal(interaction)
        }
    }
}

async function showTheModal(interaction: ButtonInteraction) {
    await interaction.showModal({
        title: 'Marketplace Verification Application',
        custom_id: 'marketplace_verification_modal',
        components: [
            {
                type: 1,
                components: [
                    {
                        type: 4,
                        label: 'Short Introduction',
                        custom_id: 'short_introduction_input',
                        style: 2,
                        min_length: 1,
                        max_length: 2048,
                        required: true,
                        placeholder: 'Hi, I am...'
                    },
                ]
            },
            {
                type: 1,
                components: [
                    {
                        type: 4,
                        label: 'What do you plan to sell/promote?',
                        custom_id: 'what_to_sell_input',
                        style: 2,
                        min_length: 1,
                        max_length: 2048,
                        required: true,
                        placeholder: 'I plan to...'
                    },]
            },
            {
                type: 1,
                components: [
                    {
                        type: 4,
                        custom_id: 'portfolio_link_input',
                        label: 'Portfolio Link',
                        style: 1,
                        min_length: 1,
                        max_length: 2048,
                        placeholder: 'https://example.com/my-portfolio',
                        required: true
                    }
                ]
            },
            {
                type: 1,
                components: [
                    {
                        type: 4,
                        label: 'Do you want to share any social media pages?',
                        custom_id: 'social_media_input',
                        style: 2,
                        min_length: 1,
                        max_length: 2048,
                        placeholder: 'https://twitter.com/username\nhttps://instagram.com/username',
                        required: false
                    }
                ]
            }
        ]
    })
}