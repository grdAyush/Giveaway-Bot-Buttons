const {
	ApplicationCommandType,
	PermissionFlagsBits, EmbedBuilder, ButtonStyle, ButtonBuilder, ApplicationCommandOptionType,  SelectMenuOptionBuilder, ActionRowBuilder, AttachmentBuilder, parseEmoji
}  = require(`discord.js`);

module.exports = {
	name: `delete-all`,
	description: `delete all the giveaways in the guild`,
	cooldown: 3,
	type: ApplicationCommandType.ChatInput,
	botPerms: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks],
	userPerms: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks, 
  PermissionFlagsBits.ManageGuild ],
	devOnly: false,
	maintenance: false,

	async execute(client, interaction) {

           const data = await client.manager.deleteall(interaction.guildId);
          interaction.reply({
            content: `${data?.deleted} Giveaways Deleted`,
          })
	
}};