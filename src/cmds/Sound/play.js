const ytdl = require("ytdl-core");
const discord = require("discord.js");

const { YTSearcher } = require("ytsearcher");
const searcher = new YTSearcher(process.env.YT_API_KEY);

err = (e, m) => {
    console.log(e);
    m.channel.send("An error occured! We're sorry.");
}

module.exports.run = async (msg, args, client) => {
    var link = args[0] || "https://www.youtube.com/watch?v=EE-xtCF3T94&list";
    var vol = Number(args[1]) || 1;

    const matches = msg.content.toLowerCase().match(/\[(.*?)\]/);
    const id = msg.guild.id;

    var alreadySentEmbed;
    var searchTerms;

    const embed = new discord.MessageEmbed();

    if (!args[2]) args[2] = "";
    var songLooped = args[2].toLowerCase() === "yes" || args[2].toLowerCase() === "true" || false;

    if (matches) var searchTermsArgs = matches[1].split(/ +/);

    embed.setColor(colorScheme);
    embed.setImage(msg.guild.me.user.avatarURL());

    if (args[0] && !args[0].startsWith("https://")) searchTerms = true;
    if (!msg.member.voice.channel) return msg.channel.send("You must join a voice channel.");

    if (searchTerms) {
        const terms = args.slice(0, 6).toString().replace(/[,]/g, " ").replace(/ *\[[^\]]*]/, "");

        if (terms.length > 100) return msg.channel.send("Search terms are too large.");
        const results = await searcher.search(terms);

        if (!results.first) return msg.channel.send("We couldn't find that! Try using different search terms");
        link = results.first.url;
    }

    if (searchTermsArgs) {
        vol = searchTermsArgs[0] || 1;
        songLooped = searchTermsArgs[1] === "yes" || searchTermsArgs[1] === "true" || false;
    }


    msg.member.voice.channel.join().then((connection) => {
        handle = async () => {
            var playlist = playlists[id];
            var currentSong;

            let info = ytdl.validateURL(link);
            if (!info) return msg.channel.send("We couldn't access this song, this could be for many reasons, the song may not be available to our region or it wasn't a valid link.");

            if (!playlist) {
                console.log("New playlist created");
                playlist = playlists[id] = {};

                playlist.songs = [];
                playlist.index = 0;


                playlist.songs.push(link);
                currentSong = playlist.songs[playlist.index];
            } else {
                console.log("Playlist found");
                playlist = playlists[id];
                playlist.songs.push(link);

                currentSong = playlist.songs[playlist.index];
            }

            if (!currentSong) return;

            try {
                if (playlist.playing) return;

                const stream = ytdl(currentSong, { filter: "audioandvideo", quality: "highestaudio" });
                var dispatcher = connection.play(stream);

                dispatcher.setVolume(vol);

                stream.on("info", (i) => {
                    embed.setTitle("Now listening to " + i.videoDetails.title);
                    embed.setURL(link);

                    embed.setDescription(`Requested by ${msg.author.username}\nArtist: **${i.videoDetails.author.name}**`);
                })

                dispatcher.on("error", (e) => {
                    err(e, msg);
                })

                dispatcher.on("finish", async () => {
                    playlist.playing = false;

                    if (!songLooped) {
                        playlist.index++;
                        handle();
                    } else {
                        dispatcher.destroy();
                        handle();
                    }
                })

                dispatcher.on("start", () => {
                    playlist.playing = true;
                    if (!alreadySentEmbed) msg.channel.send(embed); alreadySentEmbed = true;
                })

                connection.on("error", (e) => {
                    err(e, msg);
                })

                stream.on("error", (e) => {
                    err(e, msg);
                })
            } catch (e) {
                err(e, msg);
            }
        }

        handle();
    })
}

module.exports.names = ["Play", "P", "Song"];
module.exports.icon = "🔊";

module.exports.description = "Play a song with a link or search string.";


