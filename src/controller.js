const discord = require("discord.js");
const fs = require("fs");

const dotenv = require("dotenv");
const client = new discord.Client();

const activeCmds = require("./modules/active_cmds");
const indexReference = require("./index");

dotenv.config({ path: __dirname.replace("src", "ignored/") + ".env" });
client.login(process.env.LOGIN_TOKEN);

client.on("ready", () => {
    console.log("Client is ready.");
})

client.on("message", (msg) => {
    const originalMsg = msg;
    msg = msg.content.toLowerCase();

    if (!msg.startsWith(process.env.BOT_PREFIX)) return;
    if (originalMsg.author.bot) return;

    const args = originalMsg.content.slice(process.env.BOT_PREFIX.length).split(/ +/), command = args.shift();

    for (cmd in activeCmds) {
        cmd = activeCmds[cmd];

        if (command === cmd.name.toLowerCase()) {
            cmd.run(originalMsg, args);
        }
    }
})

