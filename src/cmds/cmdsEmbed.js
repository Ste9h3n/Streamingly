const discord = require("discord.js");

module.exports.run = (msg) => {
    const activeCmds = require("../modules/active_cmds");
    const embed = new discord.MessageEmbed();

    embed.setColor("#6658fc");
    embed.setTitle("Commands");
    
    for (cmd in activeCmds) {
        cmd = activeCmds[cmd];
        embed.addField(cmd.name +" "+ cmd.icon, cmd.description, true);
    }

    msg.channel.send(embed);
}

module.exports.name = "Cmds";
module.exports.icon = "📃";

module.exports.description = "Get's a list of commands for the bot.";

