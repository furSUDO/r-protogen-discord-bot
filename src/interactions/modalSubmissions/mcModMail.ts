import { PrismaClient } from '@prisma/client';
import { ChannelType, ModalSubmitInteraction } from 'discord.js';
import { env } from '../../env';
import { Submission } from './base';
import { createModMailTicket } from '../../helpers/CreateModMail';


export class MCNModMail implements Submission {
    custom_id = 'mc_new_modmail';
    // @ts-ignore - idfk
    public async execute(interaction: ModalSubmitInteraction, prisma: PrismaClient) {
        createModMailTicket(prisma,interaction,interaction.fields.getTextInputValue('ticket_reason'),interaction.user.id)
    }
}