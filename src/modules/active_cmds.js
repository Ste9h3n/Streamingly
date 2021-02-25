const folder = "../cmds/";
const utility = folder + "Utility/";

const beta = folder + "Beta/";
const sound = folder + "Sound/";

module.exports = {
    beta: {
        _icon: ":tools:",
        _name: "Beta",

        _description: "The latest commands, expect bugs.",
    },

    sound: {
        _icon: ":musical_note:",
        _name: "Sound",

        _description: "Sound related commands",

        play: require(sound + "play"),
        stop: require(sound + "stop"),
        volume: require(sound + "volume"),
        playlist: require(sound + "playlist"),
    },

    utility: {
        _icon: ":gear:",
        _name: "Utility",

        _description: "General configuration commands",

        clean: require(utility + "clean"),
        cmdsEmbed: require(utility + "cmdsEmbed"),
        test: require(utility + "test"),
    },
};

