const {
	ApplicationCommandType,
	PermissionFlagsBits, EmbedBuilder, ButtonStyle, ButtonBuilder, ApplicationCommandOptionType,  SelectMenuOptionBuilder, ActionRowBuilder, AttachmentBuilder, parseEmoji
}  = require(`discord.js`);

module.exports = {
	name: `edit`,
	description: `Edit The Giveaway`,
	cooldown: 3,
	type: ApplicationCommandType.ChatInput,
	botPerms: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks],
	userPerms: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks, PermissionFlagsBits.ManageGuild ],
	devOnly: false,
	maintenance: false,
  options: [
    {
      name: 'message-id',
      type: ApplicationCommandOptionType.String,
      description: "Message Id Of the Giveaway",
      required: true
    },
    {
      name: "prize",
      type: ApplicationCommandOptionType.String,
      description: "prizw of your giveaway",
      required: true
    },
    {
      name: "winners",
      type: ApplicationCommandOptionType.Number,
      description: "Number of Winners",
      required: true
    },
  ],

	async execute(client, interaction) {

         let messageId = interaction.options.getString("message-id", true);
          let prize = interaction.options.getString("prize", true);
          let wincount = interaction.options.getNumber("winners", true);
          let edited = await client.manager.editGiveaway(messageId, {
            prize: prize,
            winCount: wincount,
          });
          if (edited) {
            interaction.reply({
              content: `Giveaway Edited`,
            });
          } else {
            interaction.reply({
              content: `Invalid Giveaway`,
            });
          }
		
	},
};