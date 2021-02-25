const discord = require("discord.js");
const ytdl = require("ytdl-core");

module.exports.run = async (msg, args, client) => {
    const id = msg.guild.id;
    const playlist = playlists[id];

    if (!playlist) return msg.channel.send("No playlist currently for this server, play songs to create one.");

    const songs = playlist.songs;
    const embed = new discord.MessageEmbed();

    embed.setTitle("Playlist for " + msg.guild.name);
    embed.setColor(colorScheme);

    for (var i = 0; i < songs.length; i++) {
        var song = songs[i];

        try {
            const info = await ytdl.getInfo(song);

            const minutes = Math.floor(info.videoDetails.lengthSeconds / 60);
            const seconds = info.videoDetails.lengthSeconds - minutes * 60;

            const formatted = `${minutes}:${seconds}`;

            embed.addField(info.videoDetails.title, `${formatted} | Artist: ${info.videoDetails.author.name}`);
        } catch (e) {}
    }

    msg.channel.send(embed);
}

module.exports.names = ["Playlist", "Queue", "Playlists", "List", "Que"];
module.exports.icon = ":page_facing_up:";

module.description = "Get the current playlist in this server";

