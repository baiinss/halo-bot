require("./src/store")
const  { CommandoClient } = require("discord.js-commando")
const path = require("path")
const config = require("./config.json")

const client = new CommandoClient({
    commandPrefix: config.prefix,
    owner: config.owner,
})

client.registry
    .registerDefaultTypes()
    .registerGroups([["tryout", "tryout commands"], ["owner", "Owner Commands!"]])
    .registerDefaultGroups()
	.registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, "src/commands"));

client.once("ready", () => {
	console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
	client.user.setActivity("Echo vr");
})

client.on("guildMemberAdd", member => {
    member.createDM(true).then(channel => {
        channel.send("Welcome to the Halo Team Discord server, if you are here to tryout, please do that in my dms right here. To start a ticket to tryout type h!tryout")
    })
})

client.on("error", console.error);

global.client = client

client.login(config.token)