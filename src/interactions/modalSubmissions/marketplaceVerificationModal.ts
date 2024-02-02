import { PrismaClient } from '@prisma/client';
import { ChannelType, ModalSubmitInteraction } from 'discord.js';
import { env } from 'env';
import { Submission } from './base';


export class MPSubmit implements Submission {
  custom_id = 'marketplace_verification_modal';
  // @ts-ignore - idfk
  public async execute(interaction: ModalSubmitInteraction, prisma: PrismaClient) {
    await interaction.deferReply({ ephemeral: true });
    await prisma.marketplaceApplicant.upsert({
      where: {
        id: interaction.user.id
      },
      update: {
        lastFormSent: new Date()
      },
      create: {
        id: interaction.user.id,
        lastFormSent: new Date()
      }
    })
    let logChannel = interaction.guild?.channels.cache.get(env.GUILD_LOGGING_CHANNEL_ID)
    if (logChannel?.type === ChannelType.GuildText) {
      logChannel.threads.cache.get(env.THREAD_MPAQ_ID)?.send({
        content: `+info ${interaction.user.id}`,
        embeds: [
          {
            color: 3092790,
            image: {
              url: 'https://media.discordapp.net/attachments/1072902797999210506/1072904224775602287/Marketplace_Var.png'
            }
          },
          {
            title: 'New Application!',
            color: 3092790,
            fields: [
              {
                name: 'User',
                value: `<@${interaction.user.id}> (${interaction.user.id})`,
                inline: true
              },
              {
                name: 'Short Introduction',
                value: interaction.fields.getTextInputValue('short_introduction_input'),
              },
              {
                name: 'What do they plan to sell/promote',
                value: interaction.fields.getTextInputValue('what_to_sell_input'),
              },
              {
                name: 'Portfolio',
                value: interaction.fields.getTextInputValue('portfolio_link_input'),
                inline: true
              },
              ...interaction.fields.getTextInputValue('social_media_input') ? [{
                name: 'Social Media',
                value: interaction.fields.getTextInputValue('social_media_input'),
                inline: true
              }] : []
            ],
            image: {
              url: 'https://cdn.discordapp.com/attachments/756644176795533334/847276996564353054/Embed_width.png'
            },
            thumbnail: {
              url: `${interaction.user.displayAvatarURL()}`
            }
          }
        ],
        components: [{
          type: 1,
          components: [
            {
              type: 2,
              label: 'Approve',
              style: 3,
              custom_id: `custom_MPQA_${interaction.user.id}`,
            },
            {
              type: 2,
              label: 'Deny',
              style: 4,
              custom_id: `custom_MPQD_${interaction.user.id}`,
            }
          ]
        }]
      }).then(msg => {
        interaction.editReply({
          embeds: [{
            color: 3092790,
            image: {
              url: 'https://media.discordapp.net/attachments/1072902797999210506/1072971687714365570/Request_Sent.png'
            }
          }]
        })
      })
    }
  }
}