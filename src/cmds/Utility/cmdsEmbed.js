const discord = require("discord.js");

module.exports.run = (msg, args, client) => {
    const activeCmds = require("../../modules/active_cmds");
    const embed = new discord.MessageEmbed();

    var dontExecute;

    for (let group in activeCmds) {
        group = activeCmds[group];

        if (args[0] && group._name.toLowerCase() === args[0].toLowerCase()) {
            dontExecute = true;
            
            for (let cmd in group) {
                if (cmd.startsWith("_")) continue;
                cmd = group[cmd];

                embed.addField(`${cmd.names[0]} ${cmd.icon}`, cmd.description, true);
            }

            embed.setTitle("Commands");
            embed.setColor("#26c2ff");

            msg.channel.send(embed);

            return;
        }
    }

    for (let group in activeCmds) {
        group = activeCmds[group];
        embed.addField(`${group._name} ${group._icon}`, group._description, true);
    }

    embed.setColor(colorScheme);
    embed.setTitle("Groups");

    msg.channel.send(embed);
}

module.exports.names = ["Cmds", "Commands"];
module.exports.icon = "📃";

module.exports.description = "Gets a list of commands for the bot.";

