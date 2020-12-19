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

    for (cmd in activeCmds) {
        cmd = activeCmds[cmd];

        if (msg === process.env.BOT_PREFIX+cmd.name.toLowerCase()) {
            cmd.run(originalMsg);
        }
    }
})

