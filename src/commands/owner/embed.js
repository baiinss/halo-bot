const { Command } = require("discord.js-commando")
const config = require("../../../config.json")
const { MessageEmbed } = require("discord.js")

module.exports = class Tryout extends Command {
    constructor(client) {
        let wait = { wait: 120 }
        super(client, {
            name: "embed",
            group: "owner",
            memberName: "owner",
            description: "Command for sending custom embeds!!",
            ownerOnly: true,
            args: [
                {
                    key: "channel",
                    type: "channel",
                    prompt: "What channel would you like to send this message to?",
                    ...wait
                },
                {
                    key: "title",
                    type: "string",
                    prompt: "What would you like to title this embed? (if none say none)",
                    ...wait
                },
                {
                    key: "fields",
                    type: "string",
                    prompt: "What fields would you like to add? (use JSON discord formatting)",
                    wait: 300
                },
                {
                    key: "footer",
                    type: "string",
                    prompt: "What would you like the footer to be? (If none say none)",
                    ...wait
                }
            ]
        })
    }

    /*
     * Add support for the rest of embeds tommorow
    */

    async run(message, { channel, title, fields, footer }) {
        let user = await this.client.users.fetch(message.author.id)
        let parsedFields = JSON.parse(fields)

        let embed = new MessageEmbed()
        .setAuthor(message.author.username, user.displayAvatarURL())
        .setColor(config.color)
        .addFields(...parsedFields)
        .setTimestamp()

        if (title.toLowerCase() != "none") {
            embed.setTitle(title)
        }

        if (footer.toLowerCase() != "none") {
            embed.setFooter(footer)
        }

        channel.send(embed)
    }
}