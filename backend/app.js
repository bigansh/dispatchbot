const Discord = require('discord.js'),
	dotenv = require('dotenv').config()

const client = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
})

const dmHandler = require('./functions/message-handler/dmHandler'),
	dmReactionHandler = require('./functions/message-handler/dmReactionHandler'),
	delHandler = require('./functions/message-handler/delHandler'),
	delReactionHan = require('./functions/message-handler/delReactionHan'),
	helpHandler = require('./functions/message-handler/helpHandler'),
	gdmHandler = require('./functions/message-handler/gdmHandler'),
	gdmReactionHandler = require('./functions/message-handler/gdmReactionHandler')

const categoryCreate = require('./functions/utils/categoryCreate'),
	requestChannelCreate = require('./functions/utils/requestChannelCreate'),
	notAllowed = require('./functions/utils/notAllowed')

const { COMMAND, TOKEN } = process.env

client.login(TOKEN)

client.on('ready', () => {
	console.log('Bot Online!')

	client.user.setActivity(`!dis help in ${client.guilds.cache.size} servers`, {
		type: 'LISTENING',
	})
})

client.on('guildCreate', async (server) => {
	const categoryId = await categoryCreate(server)

	await requestChannelCreate(server, categoryId)

	client.user.setActivity(`!dis help in ${client.guilds.cache.size} servers`, {
		type: 'LISTENING',
	})
})

client.on('message', async (message) => {
	if (message.content.startsWith(COMMAND, 0)) {
		if (message.content.includes('gdm')) await gdmHandler(message)
		else if (message.content.includes('dm')) await dmHandler(message)
		else if (message.content.includes('del')) {
			if (message.channel.name.includes('-⇆-')) await delHandler(message)
			else await notAllowed(message)
		} else if (message.content.includes('help')) await helpHandler(message)
	}
})

client.on('messageReactionAdd', async (origin, user) => {
	if (user.bot) return

	const message = !origin.message.author
		? await origin.message.fetch()
		: origin.message

	if (origin.message.author.id !== client.user.id) return

	if (origin.message.embeds[0].description.includes('group DM'))
		await gdmReactionHandler(client, origin, user, message)
	else if (origin.message.embeds[0].description.includes('DM'))
		await dmReactionHandler(client, origin, user, message)
	else if (origin.message.embeds[0].description.includes('delete'))
		await delReactionHan(origin, message)
})
