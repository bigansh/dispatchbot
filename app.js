const Discord = require('discord.js'),
	dotenv = require('dotenv').config()

const client = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
})

const mainCreator = require('./functions/dm-handler/mainCreator')

const reactionRemover = require('./functions/utils/reactionRemover')

client.login(process.env.TOKEN)

client.on('ready', () => {
	console.log('Bot Online!')
})

client.on('message', async (message) => {
	if (message.content.startsWith('!dis', 0)) {
		const mentions = message.mentions.users.map((user) => user)

		const msg = new Discord.MessageEmbed()
			.setTitle('DM Request')
			.setDescription(
				`Hey ${mentions[0]}, user ${message.author} wants to DM you. Please approve or reject.`
			)

		const reply = await message.channel.send(msg)

		await Promise.all([reply.react('✅'), reply.react('❌')])
	}
})

client.on('messageReactionAdd', async (origin, user) => {
	if (user.bot) return

	const message = !origin.message.author
		? await origin.message.fetch()
		: origin.message

	const mentions = message.embeds[0].description.match(/!?(\d+)/g)

	const requestedUser = client.users.cache.get(mentions[0]),
		initiatedBy = client.users.cache.get(mentions[1])

	if (requestedUser.id !== user.id) {
		await reactionRemover(origin.message, user.id)

		return
	}

	const approval =
		requestedUser.id === user.id && origin.emoji.name === '✅' ? true : false

	if (approval) {
		message.embeds[0].addField('Status', 'Approved ✅', true)
		origin.message.edit(message.embeds[0])
		origin.message.reactions.removeAll()

		await mainCreator(
			client,
			origin.message.guild.id,
			requestedUser,
			initiatedBy
		)
	} else if (!approval) {
		message.embeds[0].addField('Status', 'Rejected ❌', true)
		origin.message.edit(message.embeds[0])
		origin.message.reactions.removeAll()
	}
})
