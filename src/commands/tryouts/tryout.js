const { Command } = require("discord.js-commando")
const config = require("../../../config.json")
const Discord = require("discord.js")

function validateLength(msg, yield) {
    if (msg.length > yield) {
        return `The maximum character length is ${yield}`
    } else return true
}

module.exports = class Tryout extends Command {
    constructor(client) {
        let wait = { wait: 120 }
        super(client, {
            name: "tryout",
            group: "tryout",
            memberName: "tryout",
            description: "Use this to submit a tryout ticket!",
            args: [
                {
                    key: "position",
                    type: "string",
                    prompt: "What position are you trying out for?",
                    oneOf: ["striker", "midfield", "goalie"],
                },
                {   
                    key: "level",
                    type: "string",
                    prompt: "What level are you?",
                    validate: msg => (Number(msg) && (Number(msg) <= 50))
                },
                {
                    key: "winrate",
                    type: "string",
                    prompt: "What is your winrate?",
                    validate: msg => validateLength(msg, 200)
                },
                {
                    key: "experience",
                    type: "string",
                    prompt: "do you have past vrml experience?",
                    validate: msg => validateLength(msg, 200),
                    ...wait
                },
                {
                    key: "expectations", 
                    type: "string",
                    prompt: "what do you expect from us as a team?",
                    validate: msg => validateLength(msg, 200),
                    ...wait
                },
                {
                    key: "timezone",
                    type: "string",
                    prompt: "what is your timezone?",
                    oneOf: ["EST", "CST", "MST", "PST"]
                },
                {
                    key: "availability",
                    type: "string",
                    prompt: "when are you available?",
                    validate: msg => validateLength(msg, 200),
                    ...wait
                },
                {
                    key: "skills",
                    type: "string",
                    prompt: "what are your skills and what do you wanna improve at?",
                    validate: msg => validateLength(msg, 350),
                    ...wait
                },
                {
                    key: "age",
                    type: "string",
                    prompt: "How old are you?",
                    validate: msg => Number(msg)
                },
                {
                    key: "gamesplayed",
                    type: "string",
                    prompt: "how many games have you played?",
                    validate: msg => Number(msg)
                }
                /*
                {
                    key: "ect",
                    type: "string",
                    prompt: 
                }
                */
            ]
        })
    }
    
    async run(message, { level, position, winrate, experience, expectations, timezone, availability, skills, age }) {
        let tryouts = this.client.channels.cache.get(config.tryouts)
        let user = await this.client.users.fetch(message.author.id)

        let embed = new Discord.MessageEmbed()
        .setTitle("Tryout Form")
        .setAuthor(message.author.username, user.displayAvatarURL())
        .setColor(config.color)
        .addFields(
            { name: "Level", value: level, inline: true },
            { name: "Position", value: position, inline: true },
            { name: "Winrate", value: winrate, inline: true },
            { name: "Timezone", value: timezone, inline: true },
            { name: "Age", value: age, inline: true },
            { name: "Vrml experience", value: experience },
            { name: "Availability", value: availability },
            { name: "Skills", value: skills },
            { name: "Expectations from the team", value: expectations }
        )
        .setTimestamp()
        .setFooter("Tryout Submission")
        
        tryouts.send(embed)
    }
}