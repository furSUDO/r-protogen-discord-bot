import { ChatInputCommandInteraction, MessageCreateOptions, MessagePayload } from "discord.js";
import { SlashCommand } from "../base";

export class Embed implements SlashCommand {
  name = "embed";
  description = "embed stuff.";
  default_member_permissions = ["0x0000000000000010"];
  options = [
    {
      type: 3,
      name: "embed",
      description: "Which embed do you want to send?",
      required: true,
      choices: [
        {
          name: "Marketplace Application",
          value: "marketplace_application"
        },
        {
          name: "Mod Contact",
          value: "mod_contact"
        },
        {
          name: "Mod Area",
          value: "mod_area"
        },
      ]
    },
    {
      type: 5,
      name: "test_mode",
      description: "Do you want to test the embed?",
      required: false
    }
  ];
  type = 1;
  defer = true;
  ephemeral = true;

  public async execute(interaction: ChatInputCommandInteraction) {
    let data: MessageCreateOptions = {};
    switch (interaction.options.getString("embed")) {
      case "marketplace_application":
        data = {
          embeds: [
            {
              "color": 2895153,
              "image": {
                "url": "https://media.discordapp.net/attachments/1072902797999210506/1072904224473624657/Marketplace.png"
              }
            },
            {
              "title": "Info",
              "description": "Welcome to the r/protogen Marketplace!\nHere, verified artists can showcase their work and offer their services, including commission opportunities and fursona adoptions, to the community.",
              "color": 2895153,
              "image": {
                "url": "https://cdn.discordapp.com/attachments/756644176795533334/847276996564353054/Embed_width.png"
              }
            },
            {
              "title": "Guidelines",
              "description": "All posts in <#1072906792641773629> must comply with the server's guidelines, which can be found in the <#745228528450142289>. \nTo ensure a smooth and fair marketplace experience, it is important to familiarize yourself with these guidelines before making a post.",
              "color": 2895153,
              "image": {
                "url": "https://cdn.discordapp.com/attachments/756644176795533334/847276996564353054/Embed_width.png"
              }
            },
            {
              "title": "How can I post?",
              "description": "To ensure the quality and authenticity of marketplace posts, all members must be verified before they are allowed to post. To start the verification process, simply click the button below.\n\nBefore applying, be sure to review the Marketplace Verification Requirements by clicking [here](https://discord.com/channels/725241819960705154/1072912875628269648 'Marketplace Verification Requirements') to ensure you meet all the necessary criteria.",
              "color": 2895153,
              "image": {
                "url": "https://cdn.discordapp.com/attachments/756644176795533334/847276996564353054/Embed_width.png"
              }
            }
          ],
          components: [{
            type: 1,
            components: [{
              type: 2,
              label: "Apply",
              style: 1,
              custom_id: "marketplace_apply_button",
            }]
          }]
        }
        break;

      case "mod_contact":
        data = {
          embeds: [
            {
              color: 2895153,
              image: {
                url: "https://media.discordapp.net/attachments/1072902797999210506/1206203192027906089/Mod_Contact.png?format=webp&quality=lossless"
              }
            },
            {
              color: 2895153,
              title: "Info",
              description: "Welcome to the r/protogen moderator contact form. Click 'Start Wizard' to contact mods or report a user.",
              image: {
                url: "https://cdn.discordapp.com/attachments/756644176795533334/847276996564353054/Embed_width.png"
              }
            },
          ],
          components: [
            {
              type: 1,
              components: [
                {
                  type: 2,
                  label: "Start Wizard",
                  style: 1,
                  custom_id: "modcontact_wizard_button"
                },
                {
                  type: 2,
                  label: "FAQ",
                  style: 5,
                  url: "https://discord.com/channels/725241819960705154/1206204995238760490"
                }
              ]
            }
          ]
        }
        break;

      case "mod_area":
        data = {
          "embeds": [
            {
              "color": 3092790,
              "image": {
                "url": "https://media.discordapp.net/attachments/1072902797999210506/1073448128931438622/Mod_Area.png"
              }
            },
            {
              "title": "🔨 Mod Notion Links",
              "color": 3092790,
              "fields": [
                {
                  "name": "Resources",
                  "value": "🌊 [Moderation Flow](https://furmedia.notion.site/Moderation-Flow-fc2400888eb44e3297f4617db2f571a5 'Our moderation flow on Notion.')\n\n🤖 [Our bots, and what they do](https://furmedia.notion.site/Our-Bots-and-what-they-do-d88a5fb4e3c0438997f7985d0dfe1f2f 'List of our bots and their most used commands.')",
                  "inline": true
                },
                {
                  "name": "ㅤ",
                  "value": "⚠️ [Handling difficult situations](https://furmedia.notion.site/Handling-difficult-situations-9139341123e74f8c813b9d455983865b 'Guide to handling difficult situations.')\n\n📕 [General Resources](https://furmedia.notion.site/Resources-8a2b417195d348618cc3f1c1b66cf1b4 'Moderation related resources')",
                  "inline": true
                }
              ],
              "image": {
                "url": "https://cdn.discordapp.com/attachments/756644176795533334/847276996564353054/Embed_width.png"
              }
            },
            {
              "title": "🛡️ Our Channels",
              "color": 3092790,
              "fields": [
                {
                  "name": "General",
                  "value": "🫂 [Mod Chat](https://discord.com/channels/725241819960705154/1073451505530716250 'General Chat for the mods <3')"
                },
                {
                  "name": "Discord",
                  "value": "🛡️ [Discord Moderation](https://discord.com/channels/725241819960705154/1073451689807458304 'Channel for discussion and running commands')",
                  "inline": true
                },
                {
                  "name": "Reddit",
                  "value": "🛡️ [Reddit Moderation](https://discord.com/channels/725241819960705154/1073451763824345128 'Channel for discussion of subreddit stuff')",
                  "inline": true
                },
                {
                  "name": "ㅤ",
                  "value": "ㅤ",
                  inline: true
                },
                {
                  "name": "Moderation Queues",
                  "value": "🙋 [Marketplace Approval Queue](https://discord.com/channels/725241819960705154/1072956952021311610)\n\n💌 [ModMail Logs](https://discord.com/channels/725241819960705154/1215766690844119181)",
                  inline: true
                },
                {
                  "name": "ㅤ",
                  value: "❗ [Report Queue](https://discord.com/channels/725241819960705154/1074404711433777183)",
                  inline: true
                },
                {
                  "name": "ㅤ",
                  "value": "ㅤ",
                  inline: true
                },
              ],
              "image": {
                "url": "https://cdn.discordapp.com/attachments/756644176795533334/847276996564353054/Embed_width.png"
              }
            }
          ],
          components: [{
            type: 1,
            components: [
              {
                type: 2,
                label: 'Create ModMail Ticket',
                style: 1,
                custom_id: `ma_create_mmt_showform`,
              },
            ]
          }]
        }
        break;

      default:
        break;
    }
    interaction.options.getBoolean("test_mode")
      ? await interaction.editReply(data)
      : await interaction.channel?.send(data) && await interaction.editReply("Embed sent!");
  }
}
