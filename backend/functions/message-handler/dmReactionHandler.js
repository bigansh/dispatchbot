const Discord = require('discord.js')

const mainCreator = require('../channel-handler/mainCreator')

const reactionRemover = require('../utils/reactionRemover')

/**
 * This function handles the reaction to the DM request and its procedures.
 *
 * @param {Discord.Client} client
 * @param {Discord.MessageReaction} origin
 * @param {Discord.User} user
 * @param {Discord.Message} message
 * @returns
 */

const reactionHandler = async (client, origin, user, message) => {
	try {
		let reason = undefined

		const mentions = message.embeds[0].description.match(/!?(\d+)/g)

		const requested = mentions[0]

		if (message.embeds[0].fields[0]) reason = message.embeds[0].fields[0].value

		if (requested !== user.id) {
			await reactionRemover(origin.message, user.id)

			return
		}

		let approval

		if (origin.emoji.name === '❌') approval = false
		else if (origin.emoji.name === '✅') approval = true

		if (approval === true) {
			message.embeds[0].addField('Status', 'Approved ✅', true)

			origin.message.edit(message.embeds[0])
			origin.message.reactions.removeAll()

			const requested = await client.users.fetch(mentions[0]),
				initiated = await client.users.fetch(mentions[1])

			const channel = origin.message.guild.channels.cache.filter((channel) =>
					channel.name.includes('request-channels')
				),
				serverId = origin.message.guild.id,
				categoryId = channel.map((channel) => channel.parentID)[0]

			await mainCreator(
				client,
				serverId,
				categoryId,
				reason,
				requested,
				initiated,
				(members = undefined)
			)

			return
		} else if (approval === false) {
			message.embeds[0].addField('Status', 'Rejected ❌', false)

			origin.message.edit(message.embeds[0])
			origin.message.reactions.removeAll()
		}
	} catch (e) {
		console.log(e)
	}
}

module.exports = reactionHandler
