const Discord = require('discord.js')

const mainVoiceCreator = require('../channel-handler/mainVoiceCreator')

const reactionRemover = require('../utils/reactionRemover')

/**
 * This function handles the reaction to the VC request and its procedures.
 *
 * @param {Discord.Client} client
 * @param {Discord.MessageReaction} origin
 * @param {Discord.User} user
 * @param {Discord.Message} message
 * @returns
 */

const vcReactionHandler = async (client, origin, user, message) => {
	try {
		let reason = undefined

		const mentions = message.embeds[0].description.match(/!?(\d+)/g)

		if (!mentions.includes(user.id)) {
			await reactionRemover(origin.message, user.id)

			return
		}

		const requested = await client.users.fetch(mentions[0]),
			initiated = await client.users.fetch(mentions[1])

		if (message.embeds[0].fields[0]) reason = message.embeds[0].fields[0].value

		let approval

		if (origin.emoji.name === '❌') approval = false
		else if (origin.emoji.name === '✅') approval = true

		if(approval) {
			if (
				!message.guild.member(initiated).voice.channelID ||
				!message.guild.member(requested).voice.channelID
			) {
				const vcLobby = message.channel.guild.channels.cache
					.filter(
						(channel) =>
							channel.name.includes('lobby') &&
							channel.type === 'voice' &&
							channel.parentID === message.channel.parentID
					)
					.first()

				const msg = await message.channel.send(
					new Discord.MessageEmbed()
						.setTitle('Warning')
						.setDescription(
							`Please join the ${vcLobby} VC in-oder to proceed with the request.`
						)
						.setColor('#c98fd9')
				)

				await reactionRemover(origin.message, user.id)

				await msg.delete({ timeout: 3 * 1000 })

				return
			}
		}

		if (
			approval &&
			origin.message.reactions.cache.get('✅').count - 1 === mentions.length
		) {
			message.embeds[0].addField('Status', 'Approved ✅', true)

			origin.message.edit(message.embeds[0])
			origin.message.reactions.removeAll()

			const channel = origin.message.guild.channels.cache.filter((channel) =>
					channel.name.includes('request-channels')
				),
				serverId = origin.message.guild.id,
				categoryId = channel.map((channel) => channel.parentID)[0]

			return await mainVoiceCreator(
				client,
				serverId,
				categoryId,
				reason,
				requested,
				initiated,
				(members = undefined)
			)
		} else if (!approval) {
			message.embeds[0].addField('Status', 'Rejected ❌', false)

			origin.message.edit(message.embeds[0])
			origin.message.reactions.removeAll()
		}
	} catch (e) {
		console.log(e)
	}
}

module.exports = vcReactionHandler
