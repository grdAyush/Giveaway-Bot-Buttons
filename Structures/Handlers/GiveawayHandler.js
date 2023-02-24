const { EmbedBuilder } = require("discord.js")

module.exports = (client) => {

  const { Manager } = require("real-giveaways")

class CustomManager extends Manager {
  GiveawayStartEmbed(giveaway) {
    let embed = new EmbedBuilder()
      .setTitle(`Giveway Started`)
      .setColor(client.color)
            .setTimestamp(Date.now())
      .setDescription(`Click on Join Button To Enter in Giveaway`)
      .setFooter({
        text: `0 Users Joined`,
      })
      .addFields([
        {
          name: `Prize`,
          value: `> \`${giveaway.prize}\``,
          inline: true,
        },
        {
          name: `Ends In`,
          // value: `> <t:${giveaway.endTime}:R>`,
          value: `> <t:${Math.floor(giveaway.endTime / 1000)}:R>`,

          inline: true,
        },
        {
          name: `Winners`,
          value: `> \`${giveaway.winCount}\``,
          inline: true,
        },
        {
          name: `Hosted By`,
          value: `> <@${giveaway.hostedBy}>`,
          // inline: true,
        },
      ]);
    return embed;
  }
  GiveawayEndNoWinnerEmbed(giveaway) {
    let embed = new EmbedBuilder()
      .setTitle(`Giveway Ended No Winner`)
     .setTimestamp(Date.now())
       .setColor(client.color)
     .setFooter({
        text: `${giveaway.entered} Users Joined`,
      })
      .addFields([
        {
          name: `Ended At`,
          value: `> <t:${Math.floor(Date.now() / 1000)}:R>`,
          inline: true,
        },
        {
          name: `Hosted By`,
          value: `> <@${giveaway.hostedBy}>`,
          inline: true,
        },
        {
          name: `Prize`,
          value: `> \`${giveaway.prize}\``,
          inline: true,
        },
      ]);
    return embed;
  }
  GiveawayEndWinnerEmbed(giveaway) {
    let embed = new EmbedBuilder()
      .setTitle(`Giveway Ended`)
    .setColor(client.color)
     .setTimestamp(Date.now())
      .setDescription(
        `Giveaway Ended , ${giveaway.winners
          .map((u) => `<@${u.userID}>`)
          .join(", ")} are Winners`
      )
      .setFooter({
        text: `${giveaway.entered} Users Joined`,
      })
      .addFields([
        {
          name: `Ended At`,
          value: `> <t:${Math.floor(Date.now() / 1000)}:R>`,
          inline: true,
        },
        {
          name: `Hosted By`,
          value: `> <@${giveaway.hostedBy}>`,
          inline: true,
        },
        {
          name: `Prize`,
          value: `> \`${giveaway.prize}\``,
          inline: true,
        },
      ]);
    return embed;
  }
}

 client.manager = new CustomManager(client, {
  embedColor: client.color,
  pingEveryone: false,
  emoji: "🎁",
});

}