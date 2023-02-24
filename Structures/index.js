// PLEASE READ README.md BEFORE MAKING ANY CHANGES. JOIN THE SUPPORT SERVER FROM SUPPORT.md

const {
	Collection,
	GatewayIntentBits,
	Partials,
	Client,
  EmbedBuilder
} = require('discord.js');
require('dotenv').config();
require('colors');
const fs = require('fs');

// Initialzing Client
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.MessageContent,
	],
	partials: [
		Partials.Channel,
		Partials.Message,
		Partials.GuildMember,
		Partials.GuildScheduledEvent,
		Partials.Reaction,
		Partials.ThreadMember,
		Partials.User,
	],
	shards: 'auto',
});



// Exporting client
module.exports = client;

// Defining useful collection
client.slashCommands = new Collection();
client.messageCommands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync('./Commands/MessageCommands');
client.context = new Collection();
client.events = 0;
client.config = require('./config.json');





// Default color for your embed
client.color = "#303136";

// Default footer for your embed
client.footer = 'Made By Aayu#0552';

// Connecting handlers
const handlerFolder = fs
	.readdirSync('./Structures/Handlers')
	.filter((file) => file.endsWith('.js'));
for (const file of handlerFolder) {
	require(`./Handlers/${file}`)(client);
}

// Logging in to Discord
if (!process.env.TOKEN) {
	console.log(
		'[NO TOKEN] You did not provide any token. Make a .env file and add'.green
			.bold,
		'TOKEN=YOUR TOKEN'.red.bold,
		'in your.env file'.green.bold,
	);
	return;
}
client
	.login(process.env.TOKEN)
	.catch((e) => console.log(`[DISCORD API] ${e}`.green.bold));


// Giveaway Manager 
let embed = new EmbedBuilder().setColor(client.color);

client.manager.on("GiveawayReady", (name) => {
  console.log(`Giveaway System is Ready`);
});
client.manager.on("GiveawayStarted", (message, giveaway) => {
  // console.log("GiveawayStarted");
  message.reply({
    embeds: [embed.setDescription(`Giveaway Started`)],
  });
});
client.manager.on("GiveawayWinner", (message, giveaway) => {
  // console.log("GiveawayWinner");
  let Gwinners = giveaway.winners
    .map((winner) => `<@${winner.userID}>`)
    .join(", ");
  message.channel?.send({
    content: Gwinners,
    embeds: [
      embed.setDescription(
        `${Gwinners} Won The \`${giveaway.prize}\` Giveaway Prize. Hosted By <@${giveaway.hostedBy}>`
      ),
    ],
  });

  giveaway.winners.map(async (user) => {
    const u = await message.guild.members.fetch(user.userID);
    u.send({
      embeds: [
        embed.setDescription(
          `You Won The Giveaway [\`Giveaway Link\`](${message.url})`
        ),
      ],
    });
  });
});
client.manager.on("GiveawayRerolled", (message, giveaway) => {
  // console.log("GiveawayRerolled");
  message.reply({
    embeds: [embed.setDescription(`\`${giveaway.prize}\` Giveaway Rerolled`)],
  });
});
client.manager.on("NoWinner", (message, giveaway) => {
  message.reply({
    embeds: [embed.setDescription(`No One Won ${giveaway.prize}`)],
  });
});
client.manager.on("InvalidGiveaway", (member, giveaway) => {
  member.send({
    embeds: [embed.setDescription(`You are Joining in Ended Giveaway`)],
  });
});
client.manager.on("UserJoinGiveaway", (member, giveaway) => {
  member.send({
    embeds: [embed.setDescription(`You Joined ${giveaway.prize} Giveaway`)],
  });
});
client.manager.on("UserLeftGiveaway", (member, giveaway) => {
  member.send({
    embeds: [embed.setDescription(`You Left ${giveaway.prize} Giveaway`)],
  });
});