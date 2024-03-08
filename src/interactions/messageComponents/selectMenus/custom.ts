import { AnySelectMenuInteraction } from 'discord.js';
import { SelectMenu } from '../base';
import { PrismaClient } from '@prisma/client';

export class Custom implements SelectMenu {
    custom_id = 'customsm_';
    public async execute(interaction: AnySelectMenuInteraction, prisma: PrismaClient) {
        await interaction.deferReply({ ephemeral: true })
        const args = interaction.customId.split('_');
        switch (args[1]) {
            case 'mcwru':
                MCWRU(interaction, args)
                break;

            default:
                await interaction.editReply({ content: `This interaction has not been implemented on the production version.` });
                break;
        }
    }
}
// Markeplace Queue Approve Button
async function MCWRU(interaction: AnySelectMenuInteraction, args: Array<string>) {
    switch (interaction.values[0]) {
        //TODO - handle different report types
        case 'mcr_har':
            interaction.editReply("This would then create a harassment report in https://discord.com/channels/725241819960705154/1074404711433777183.")
            break;
        case 'mcr_scam':
            interaction.editReply("This would then create a scam report in https://discord.com/channels/725241819960705154/1074404711433777183.")
            break;

        default:
            break;
    }

}