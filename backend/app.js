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
	gdmReactionHandler = require('./functions/message-handler/gdmReactionHandler'),
	vcHandler = require('./functions/message-handler/vcHandler'),
	vcReactionHandler = require('./functions/message-handler/vcReactionHandler'),
	gvcHandler = require('./functions/message-handler/gvcHandler'),
	gvcReactionHandler = require('./functions/message-handler/gvcReactionHandler')

const categoryCreate = require('./functions/utils/categoryCreate'),
	requestChannelCreate = require('./functions/utils/requestChannelCreate'),
	notAllowed = require('./functions/utils/notAllowed'),
	coolDown = require('./functions/utils/coolDown')

const { COMMAND, TOKEN } = process.env

client.login(TOKEN)

client.on('ready', () => {
	console.log('Bot Online!')

	client.user.setActivity(
		`${COMMAND} help in ${client.guilds.cache.size} servers`,
		{
			type: 'LISTENING',
		}
	)
})

client.on('guildCreate', async (server) => {
	const categoryId = await categoryCreate(server)

	await requestChannelCreate(server, categoryId)

	client.user.setActivity(
		`${COMMAND} help in ${client.guilds.cache.size} servers`,
		{
			type: 'LISTENING',
		}
	)
})

const requestMap = new Map(),
	sentMap = new Map()

client.on('message', async (message) => {
	if (message.content.startsWith(COMMAND, 0)) {
		const user = message.author.id

		let first = false

		if (!requestMap.has(user)) {
			requestMap.set(user, Date.now())
			sentMap.set(user, false)

			first = true
		}

		const previousRequestTime = requestMap.get(user),
			currentRequestTime = Date.now()

		const timeGap = (currentRequestTime - previousRequestTime) / 1000

		if (timeGap < 10 && first === false) {
			if (!sentMap.get(user)) {
				await message.channel.send(
					new Discord.MessageEmbed()
						.setTitle('Request Failed')
						.setDescription(
							'Hey, please wait at least 10 seconds before sending another request.'
						)
						.setColor('#c98fd9')
				)

				sentMap.set(user, true)

				return
			} else return
		} else if (timeGap >= 10 || first === true) {
			requestMap.set(user, currentRequestTime)

			setTimeout(() => {
				requestMap.delete(user)
				sentMap.delete(user)
			}, 1000 * 10)

			if (message.content.includes('dm')) {
				if (message.channel.name.includes('request-channels')) {
					if (message.content.includes('gdm')) await gdmHandler(message)
					else await dmHandler(message)
				} else {
					const channel = message.guild.channels.cache
						.filter((channel) => channel.name.includes('request-channels'))
						.first()

					await message.channel.send(
						new Discord.MessageEmbed()
							.setTitle('Request Failed')
							.setDescription(
								`Hey, this command is only executable in the ${channel} channel.`
							)
							.setColor('#c98fd9')
					)
				}
			} else if (message.content.includes('del')) {
				if (message.channel.name.includes('-⇆-')) await delHandler(message)
				else await notAllowed(message)
			} else if (message.content.includes('help')) await helpHandler(message)
			else if (message.content.includes('vc')) {
				if (!message.guild.me.permissions.has('MOVE_MEMBERS')) {
					await message.channel.send(
						new Discord.MessageEmbed()
							.setTitle('Request Failed')
							.setDescription(
								'Currently, this command cannot be executed by the bot because it lacks the necessary permissions. MODs need to provide the `MOVE MEMBERS` permission to the bot.'
							)
							.setColor('#c98fd9')
					)
					
					return
				}

				if (message.channel.name.includes('request-channels')) {
					if (message.content.includes('gvc')) await gvcHandler(message)
					else await vcHandler(message)
				} else {
					const channel = message.guild.channels.cache
						.filter((channel) => channel.name.includes('request-channels'))
						.first()

					await message.channel.send(
						new Discord.MessageEmbed()
							.setTitle('Request Failed')
							.setDescription(
								`Hey, this command is only executable in the ${channel} channel.`
							)
							.setColor('#c98fd9')
					)
				}
			} else
				await message.channel.send(
					new Discord.MessageEmbed()
						.setTitle('Request Failed')
						.setDescription(
							'Hey, no such command exists. Please use the `!dis help` command to learn more about the available commands.'
						)
						.setColor('#c98fd9')
				)
		}
	}
})

const vcMap = new Set()

client.on('messageReactionAdd', async (origin, user) => {
	try {
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
		else if (origin.message.embeds[0].description.includes('group VC'))
			vcMap.add(
				await gvcReactionHandler(client, origin, user, message).then(
					(channel) => {
						if (channel) return channel.id
					}
				)
			)
		else if (origin.message.embeds[0].description.includes('VC'))
			vcMap.add(
				await vcReactionHandler(client, origin, user, message).then(
					(channel) => {
						if (channel) return channel.id
					}
				)
			)
	} catch (e) {
		console.log(e)
	}
})

client.on('voiceStateUpdate', async (oldState, newState) => {
	if (!oldState.channel) return

	if (
		!oldState.channel.members.size &&
		vcMap.has(oldState.channelID) &&
		oldState.channelID !== newState.channelID
	) {
		vcMap.delete(oldState.channelID)

		await oldState.channel.delete()
	}
})
