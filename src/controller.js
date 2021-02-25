const discord = require("discord.js");
const fs = require("fs");

const dotenv = require("dotenv");
const client = new discord.Client();

dotenv.config({ path: __dirname.replace("src", "ignored/") + ".env" });
client.login(process.env.LOGIN_TOKEN);

global.playlists = [];
global.colorScheme = "#6658fc";

const activeCmds = require("./modules/active_cmds");
const indexReference = require("./index");

client.on("ready", () => {
    console.log("Client is ready.");
})

client.on("error", (e) => {
    console.log(e);
})

client.on("message", (msg) => {
    const originalMsg = msg;
    msg = msg.content.toLowerCase();

    if (!msg.startsWith(process.env.BOT_PREFIX)) return;
    if (originalMsg.author.bot) return;

    const args = originalMsg.content.slice(process.env.BOT_PREFIX.length).split(/ +/), command = args.shift();

    for (let group in activeCmds) {
        group = activeCmds[group];

        for (let cmd in group) {
            if (cmd.startsWith("_")) continue;
            cmd = group[cmd];

            for (let i = 0; i < cmd.names.length; i++) {
                var n = cmd.names[i];

                if (command === n.toLowerCase()) {
                    cmd.run(originalMsg, args, client);
                }
            }
        }
    }
})

client.on("voiceStateUpdate", (oldState, newState) => {
    if (newState.member.user === client.user) {
        const oldVC = oldState.member.voice.channel;
        const newVC = newState.member.voice.channel;

        if (newVC) {
        } else if (!newVC) {
            if (playlists[newState.member.guild.id]) playlists[newState.member.guild.id] = null;
        }
    }
})

