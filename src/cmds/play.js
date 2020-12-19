const ytdl = require("ytdl-core");

module.exports.run = (msg, args) => {
    const link = args[0] || "https://www.youtube.com/watch?v=EE-xtCF3T94&list";
    const vol = Number(args[1]) || 1;

    if (!msg.member.voice.channel) return msg.channel.send("You must join a voice channel.");

    msg.member.voice.channel.join().then((connection) => {
        try {
            const stream = ytdl(link, {filter: "audioandvideo", quality: "highestaudio"});
            const dispatcher = connection.play(stream);

            stream.on("error", (e) => {
                msg.channel.send("An error occured! We're sorry.");
            })
        } catch (error) {
            msg.channel.send("An error occured! We're sorry.");
        }
    })
}

module.exports.name = "Play";
module.exports.icon = "🔊";

module.exports.description = "Play a song with a link or search string.";


