const Discord = require('discord.js'),
	dotenv = require('dotenv').config()

const client = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
})

const disHandler = require('./functions/message-handler/disHandler'),
	reactionHandler = require('./functions/message-handler/reactionHandler')

const COMMAND = process.env.COMMAND

client.login(process.env.TOKEN)

client.on('ready', () => {
	console.log('Bot Online!')
})

client.on('message', async (message) => {
	if (message.content.startsWith(COMMAND, 0)) await disHandler(message)
})

client.on('messageReactionAdd', async (origin, user) => {
	if (user.bot) return

	await reactionHandler(client, origin, user)
})
