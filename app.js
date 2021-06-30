const Discord = require('discord.js'),
	dotenv = require('dotenv').config()

const client = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
})

const disHandler = require('./functions/message-handler/disHandler'),
	reactionHandler = require('./functions/message-handler/reactionHandler'),
	delHandler = require('./functions/message-handler/delHandler'),
	delReactionHan = require('./functions/message-handler/delReactionHan')

const categoryCreate = require('./functions/utils/categoryCreate'),
	requestChannelCreate = require('./functions/utils/requestChannelCreate')

const { COMMAND, TOKEN } = process.env

client.login(TOKEN)

client.on('ready', () => {
	console.log('Bot Online!')
})

client.on('guildCreate', async (server) => {
	const categoryId = await categoryCreate(server)

	await requestChannelCreate(server, categoryId)
})

client.on('message', async (message) => {
	if (message.content.startsWith(COMMAND, 0)) {
		if (message.content.includes('dm')) await disHandler(message)
		else if (message.content.includes('delete')) {
			if (!message.channel.name.includes('-⇆-')) return

			await delHandler(message)
		}
	}
})

client.on('messageReactionAdd', async (origin, user) => {
	if (user.bot) return

	const message = !origin.message.author
		? await origin.message.fetch()
		: origin.message

	if (origin.message.author.id !== client.user.id) return

	if (origin.message.embeds[0].description.includes('DM'))
		await reactionHandler(client, origin, user, message)
	else if (origin.message.embeds[0].description.includes('delete')) {
		if (!origin.message.channel.name.includes('-⇆-')) return

		await delReactionHan(origin, message)
	}
})
