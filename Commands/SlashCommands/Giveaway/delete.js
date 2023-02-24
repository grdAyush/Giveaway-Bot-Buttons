const {
	ApplicationCommandType,
	PermissionFlagsBits, EmbedBuilder, ButtonStyle, ButtonBuilder, ApplicationCommandOptionType,  SelectMenuOptionBuilder, ActionRowBuilder, AttachmentBuilder, parseEmoji
}  = require(`discord.js`);

module.exports = {
	name: `delete`,
	description: `delete a giveaway in your guild`,
	cooldown: 3,
	type: ApplicationCommandType.ChatInput,
	botPerms: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks],
	userPerms: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks, PermissionFlagsBits.ManageGuild],
	devOnly: false,
	maintenance: false,
  options: [
    {
      name: "message-id",
      description: 'message id of the giveaway',
      required: true,
      type: ApplicationCommandOptionType.String
    }
  ],

	async execute(client, interaction) {

    let messageId = interaction.options.getString("message-id", true);
          let deleted = await client.manager.deleteGiveaway(messageId);
          interaction.reply({
            content: `Giveaway ${deleted ? "Deleted" : "Not Deleted"}`,
          });
		
	},
};