const {
	ApplicationCommandType,
	PermissionFlagsBits, EmbedBuilder, ButtonStyle, ButtonBuilder, ApplicationCommandOptionType,  SelectMenuOptionBuilder, ActionRowBuilder, AttachmentBuilder, parseEmoji
}  = require(`discord.js`);

module.exports = {
	name: `start`,
	description: `Start The Giveaway`,
	cooldown: 3,
	type: ApplicationCommandType.ChatInput,
	botPerms: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks],
	userPerms: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks, PermissionFlagsBits.ManageGuild ],
	devOnly: false,
	maintenance: false,
  options: [
    {
      name: 'channel',
      type: ApplicationCommandOptionType.Channel,
      description: "The Channel In which You Want Start Giveaway",
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
    {
      name: "duration",
      type: ApplicationCommandOptionType.String,
      description: "Duration of the Giveaway",
      required: true
    }
  ],

	async execute(client, interaction) {

          const channel = interaction.options.getChannel("channel");
          const prize = interaction.options.getString("prize");
          const winnerCount = interaction.options.getNumber("winners");
          const duration = interaction.options.getString("duration");
          interaction.reply({
            content: `Giveaway Started`,
            ephemeral: true,
          })

    await client.manager
            .start(interaction, {
              channel: channel,
              duration: duration,
              prize: prize,
              winnerCount: winnerCount,
            })
            .catch((e) => {
              console.log(e);
            });
		
	},
};