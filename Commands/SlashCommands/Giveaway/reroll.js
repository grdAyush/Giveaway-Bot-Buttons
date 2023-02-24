const {
	ApplicationCommandType,
	PermissionFlagsBits, EmbedBuilder, ButtonStyle, ButtonBuilder, ApplicationCommandOptionType,  SelectMenuOptionBuilder, ActionRowBuilder, AttachmentBuilder, parseEmoji
}  = require(`discord.js`);

module.exports = {
	name: `re-roll`,
	description: `re-roll the giveaway`,
	cooldown: 3,
	type: ApplicationCommandType.ChatInput,
	botPerms: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks],
	userPerms: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks, 
  PermissionFlagsBits.ManageGuild ],
	devOnly: false,
	maintenance: false,
  options: [
    {
      name: "message-id",
      required: true,
      type: ApplicationCommandOptionType.String,
      description: "message id of the giveaway"
    }
  ],

	async execute(client, interaction) {

     let messageId = interaction.options.getString("message-id", true);
          let rerolled = await client.manager.rerollGiveaway(messageId);
          if (rerolled) {
            interaction.reply({
              content: `Giveaway Rerolled`,
            });
          } else {
            interaction.reply({
              content: `Invalid Giveaway`,
            });
          }
          
	},
};