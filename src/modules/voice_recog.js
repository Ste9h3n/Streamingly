const discord = require("discord.js");
const tts = require("discord-tts");

const fs = require("fs");
const prism = require("prism-media");

const zlib = require("zlib");

module.exports.Create = () => {
    const VoiceRecognition = {};

    VoiceRecognition.Start = async (client, vc, connection) => {
        connection.on("speaking", (user, speaking) => {
            if (speaking && user !== client.user) {
                const audio = connection.receiver.createStream(vc.members.find(n => n.user.username === "Ste9h3n"), {mode: "pcm"});
                audio.on("data", (chunk) => {})
                
            }
        })
    }

    VoiceRecognition.Destroy = () => {

    }

    return VoiceRecognition;
}

