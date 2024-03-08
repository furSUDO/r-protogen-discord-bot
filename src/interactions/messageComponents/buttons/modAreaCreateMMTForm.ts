import { PrismaClient } from "@prisma/client";
import { ButtonInteraction } from "discord.js";
import { Button } from "../base";

export class MAMMCShowForm implements Button {
    custom_id = 'ma_create_mmt_showform';
    public async execute(interaction: ButtonInteraction, prisma: PrismaClient) {
        await interaction.showModal({
            title: 'Open a ModMail Ticket with a Member',
            custom_id: 'ma_new_modmail',
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 4,
                            label: 'Why are you opening this ticket?',
                            custom_id: 'ticket_reason',
                            style: 2,
                            min_length: 1,
                            max_length: 2048,
                            required: true
                        },
                    ]
                },
                {
                    type: 1,
                    components: [
                        {
                            type: 4,
                            label: 'UserID of Target User.',
                            custom_id: 'ticket_targetuserid',
                            style: 1,
                            min_length: 1,
                            max_length: 24,
                            required: true
                        },
                    ]
                },
            ]
        })
    }
}
