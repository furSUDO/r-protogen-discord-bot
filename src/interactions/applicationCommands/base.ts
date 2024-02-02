import { PrismaClient } from "@prisma/client";
import {
    ApplicationCommandOptionData,
    ChatInputCommandInteraction,
    ContextMenuCommandInteraction,
    MessageContextMenuCommandInteraction,
  } from "discord.js";
  
  export class BaseCommand {
    name: string;
    name_localizations?: string[];
    description?: string;
    description_localizations?: string[];
    options?: Array<ApplicationCommandOptionData>;
    default_member_permissions?: string[];
    dm_permission?: boolean;
    default_permission?: boolean;
    type?: number;
    nsfw?: boolean;
    defer?: boolean;
    ephemeral?: boolean;
    constructor(
      name: string,
      name_localizations?: string[],
      description?: string,
      description_localizations?: string[],
      options?: Array<ApplicationCommandOptionData>,
      default_member_permissions?: string[],
      dm_permission?: boolean,
      default_permission?: boolean,
      type?: number,
      nsfw?: boolean,
      defer?: boolean,
      ephemeral?: boolean
    ) {
      this.name = name;
      this.name_localizations = name_localizations;
      this.description = description;
      this.description_localizations = description_localizations;
      this.options = options;
      this.default_member_permissions = default_member_permissions;
      this.dm_permission = dm_permission;
      this.default_permission = default_permission;
      this.type = type;
      this.nsfw = nsfw;
      this.defer = defer;
      this.ephemeral = ephemeral;
    }
    async execute(
      interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction | MessageContextMenuCommandInteraction,
      prisma: PrismaClient
    ) {}
  }
  
  export interface SlashCommand extends BaseCommand {
    name: string;
    execute(interaction: ChatInputCommandInteraction, prisma: PrismaClient): Promise<void>;
  }
  
  export interface UserCommand extends BaseCommand {
    name: string;
    execute(interaction: ContextMenuCommandInteraction, prisma: PrismaClient): Promise<void>;
  }
  
  export interface MessageCommand extends BaseCommand {
    name: string;
    execute(interaction: MessageContextMenuCommandInteraction, prisma: PrismaClient): Promise<void>;
  }