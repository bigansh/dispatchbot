const Discord = require('discord.js'),
	dotenv = require('dotenv').config()

const client = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
})

const disHandler = require('./functions/message-handler/disHandler'),
	reactionHandler = require('./functions/message-handler/reactionHandler')

const categoryCreate = require('./functions/utils/categoryCreate'),
	requestChannelCreate = require('./functions/utils/requestChannelCreate')

const COMMAND = process.env.COMMAND

client.login(process.env.TOKEN)

client.on('ready', () => {
	console.log('Bot Online!')
})

client.on('guildCreate', async (server) => {
	const categoryId = await categoryCreate(server)

	await requestChannelCreate(server, categoryId)
})

client.on('message', async (message) => {
	if (message.content.startsWith(COMMAND, 0)) await disHandler(message)
})

client.on('messageReactionAdd', async (origin, user) => {
	if (user.bot) return

	await reactionHandler(client, origin, user)
})
