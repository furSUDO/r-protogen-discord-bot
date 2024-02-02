import { BaseInteraction, MessageComponentInteraction, ModalSubmitInteraction } from "discord.js";
import { BaseEvent } from "./base";

import { applicationCommands } from "../interactions";
import { PrismaClient } from "@prisma/client";
import { MessageComponents } from "../interactions/messageComponents";
import { ModalSubmissions } from "../interactions/modalSubmissions";

export default class InteractionCreate implements BaseEvent {
  public name = "interactionCreate";

  async execute(interaction: BaseInteraction, prisma: PrismaClient) {
    if (
      interaction.isChatInputCommand() ||
      interaction.isUserContextMenuCommand() ||
      interaction.isMessageContextMenuCommand()
    ) {
      await handleCommands(interaction, prisma);
    }
    if (interaction.isMessageComponent()) {
      await handleComponents(interaction, prisma);
    }
    if (interaction.isModalSubmit()) {
      await handleModals(interaction, prisma);
    }
  }
}

const handleCommands = async (interaction: any, prisma: PrismaClient): Promise<void> => {
  const command = applicationCommands.find(intr => intr.name === interaction.commandName);
  if (command === undefined) {
    await interaction.reply({ content: "This command has not been implimented.", ephemeral: true });
  }
  if (command?.defer) {
    await interaction.deferReply({ ephemeral: command?.ephemeral });
  }
  command?.execute(interaction, prisma);
}

const handleComponents = async (interaction: MessageComponentInteraction, prisma: PrismaClient): Promise<void> => {
  // Checks to see if interaction name starts with any of the custom_ids
  const component = MessageComponents.find(intr => interaction.customId.startsWith(intr.custom_id));
  if (component === undefined) {
    await interaction.reply({ content: "This component has not been implimented.", ephemeral: true });
  }
  component?.execute(interaction, prisma);
}

const handleModals = async (interaction: ModalSubmitInteraction, prisma: PrismaClient): Promise<void> => {
  const modal = ModalSubmissions.find(intr => intr.custom_id === interaction.customId);
  if (modal === undefined) {
    await interaction.reply({ content: "This modal has not been implimented.", ephemeral: true });
  }
  modal?.execute(interaction, prisma);
}

