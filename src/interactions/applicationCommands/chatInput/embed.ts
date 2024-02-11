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
        }
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

      default:
        break;
    }
    interaction.options.getBoolean("test_mode")
      ? await interaction.editReply(data)
      : await interaction.channel?.send(data) && await interaction.editReply("Embed sent!");
  }
}

// As a Community Manager, I often have to accept message requests to answer questions or resolve problems, that I don't mind, but I do mind when the user wants to have an unrelated chat, and it clogs up my DMs list.
// Simply closing the

// ```js
// channelId="DM Channel ID Here"
// ;try{await(webpackChunkdiscord_app.push([[""],{},e=>{m=[];for(let a in e.c)m.push(e.c[a])}]),m).find((e=>e?.exports?.default?.getAPIBaseURL)).exports.default.delete(`/channels/${channelId}/recipients/@me`),(webpackChunkdiscord_app.push([[""],{},e=>m=Object.values(e.c)]),m).find((e=>e.exports?.default?.showAlert)).exports.default.openAlertModal({title:"Success",body:"DM has successfully been removed, and added back to Message Requests queue!",confirmText:"OK"})}catch(e){console.log("%c❌ Error!\n%cChannel ID may be invalid (use DM Channel ID. not UserID), or script may be outdated. More information:","font-size: 50px","color: red; font-size: 18px",e)}
// ```

// Alert modals copied from [rednix's snippet](<https://discord.com/channels/603970300668805120/1101570562368745492/1101570562368745492>).

