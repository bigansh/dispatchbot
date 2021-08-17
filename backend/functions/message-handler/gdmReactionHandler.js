const Discord = require('discord.js')

const mainCreator = require('../channel-handler/mainCreator')

const reactionRemover = require('../utils/reactionRemover')

/**
 * This function handles reactions for the group DM request and its procedures.
 *
 * @param {Discord.Client} client
 * @param {Discord.MessageReaction} origin
 * @param {Discord.User} user
 * @param {Discord.Message} message
 * @returns
 */

const gdmReactionHandler = async (client, origin, user, message) => {
	try {
		const mentions = message.embeds[0].description.match(/!?(\d+)/g)

		const requestedUsers = [...mentions]

		requestedUsers.splice(0, 1)

		if (!requestedUsers.includes(user.id)) {
			await reactionRemover(origin.message, user.id)

			return
		}

		let approval

		if (origin.emoji.name === '✅' && requestedUsers.includes(user.id))
			approval = true
		else if (origin.emoji.name === '❌' && requestedUsers.includes(user.id))
			approval = false

		if (approval === false) {
			message.embeds[0].addField('Status', 'Rejected ❌', false)

			origin.message.edit(message.embeds[0])
			origin.message.reactions.removeAll()
		} else if (
			approval === true &&
			origin.message.reactions.cache.get('✅').count - 1 ===
				requestedUsers.length
		) {
			message.embeds[0].addField('Status', 'Approved ✅', true)

			origin.message.edit(message.embeds[0])
			origin.message.reactions.removeAll()

			const channel = origin.message.guild.channels.cache.filter((channel) =>
					channel.name.includes('request-dm')
				),
				serverId = origin.message.guild.id,
				categoryId = channel.map((channel) => channel.parentID)[0]

			const members = await Promise.all(
				mentions.map(async (member) => await client.users.fetch(member))
			)

			await mainCreator(
				client,
				serverId,
				categoryId,
				(requested = undefined),
				(initiated = undefined),
				members
			)

			return
		}
	} catch (e) {
		console.log(e)
	}
}

module.exports = gdmReactionHandler
