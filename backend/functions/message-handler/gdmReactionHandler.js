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
		const requestedUsers = message.embeds[0].description.match(/!?(\d+)/g)

		requestedUsers.splice(0, 1)

		if (!requestedUsers.includes(user.id)) {
			await reactionRemover(origin.message, user.id)

			return
		}

		const approval =
			requestedUsers.includes(user.id) && origin.emoji.name === '✅'
				? true
				: false

		if (!approval) {
			message.embeds[0].addField('Status', 'Rejected ❌', false)

			origin.message.edit(message.embeds[0])
			origin.message.reactions.removeAll()
		} else if (
			approval &&
			origin.message.reactions.cache.get('✅').count - 1 ===
				requestedUsers.length
		)
			console.log('Yes')
	} catch (e) {
		console.log(e)
	}
}

module.exports = gdmReactionHandler
