Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
};

module.exports.run = (msg, args, client) => {
    var amount = Number(args[0]) || 5;
    amount = amount.clamp(1, 100);

    const channel = msg.channel;
    const activeCmds = require("../../modules/active_cmds");

    channel.messages.fetch({ limit: amount }).then((messages) => {
        messages.forEach(async (message) => {
            var dontExecuteAgain;

            for (let group in activeCmds) {
                if (dontExecuteAgain) break;
                group = activeCmds[group];
    
                for (let cmd in group) {
                    if (dontExecuteAgain) break;
                    if (cmd.startsWith("_")) continue;

                    cmd = group[cmd];

                    for (let n in cmd.names) {
                        if (dontExecuteAgain) break;
                        n = cmd.names[n];

                        if (message.content.toLowerCase().startsWith(process.env.BOT_PREFIX+n.toLowerCase()) || message.member.user.id === client.user.id) {
                            if (message.author.id !== msg.author.id && !msg.member.hasPermission("ADMINISTRATOR") && message.author.id !== client.user.id) continue;
                            
                            dontExecuteAgain = true;
                            if (message.deletable) await message.delete();
                        }
                    }
                }
            }
        })
    })
}

module.exports.names = ["Clean", "Cleanup", "Clear", "Purge"];
module.exports.icon = "🧹";

module.exports.description = "Clean up bot messages.";

