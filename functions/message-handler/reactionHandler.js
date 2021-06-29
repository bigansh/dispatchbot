const Discord = require('discord.js')

const mainCreator = require('../dm-handler/mainCreator')

const reactionRemover = require('../utils/reactionRemover')

/**
 * This function handles the reaction to the DM request and its procedures.
 *
 * @param {Discord.Client} client
 * @param {Discord.MessageReaction} origin
 * @param {Discord.User} user
 * @returns
 */

const reactionHandler = async (client, origin, user) => {
	try {
		const message = !origin.message.author
			? await origin.message.fetch()
			: origin.message

		const mentions = message.embeds[0].description.match(/!?(\d+)/g)

		const requestedBy = await client.users.fetch(mentions[0]),
			initiatedBy = await client.users.fetch(mentions[1])

		if (requestedBy.id !== user.id) {
			await reactionRemover(origin.message, user.id)

			return
		}

		const approval =
			requestedBy.id === user.id && origin.emoji.name === '✅' ? true : false

		if (approval) {
			message.embeds[0].addField('Status', 'Approved ✅', true)
			origin.message.edit(message.embeds[0])
			origin.message.reactions.removeAll()

			await mainCreator(
				client,
				origin.message.guild.id,
				requestedBy,
				initiatedBy
			)
		} else if (!approval) {
			message.embeds[0].addField('Status', 'Rejected ❌', true)
			origin.message.edit(message.embeds[0])
			origin.message.reactions.removeAll()
		}
	} catch (e) {
		console.log(e)
	}
}

module.exports = reactionHandler
