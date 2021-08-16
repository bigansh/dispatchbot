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
		const mentions = message.embeds[0].description.match(/!?(\d+)/g)

		const requested = mentions[0]

		if (requested !== user.id) {
			await reactionRemover(origin.message, user.id)

			return
		}

		const approval =
			requested === user.id && origin.emoji.name === '✅' ? true : false

		if (approval) {
			message.embeds[0].addField('Status', 'Approved ✅', true)

			origin.message.edit(message.embeds[0])
			origin.message.reactions.removeAll()

			const requested = await client.users.fetch(mentions[0]),
				initiated = await client.users.fetch(mentions[1])

			const channel = origin.message.guild.channels.cache.filter((channel) =>
					channel.name.includes('request-dm')
				),
				serverId = origin.message.guild.id,
				categoryId = channel.map((channel) => channel.parentID)[0]

			await mainCreator(client, serverId, categoryId, requested, initiated)
		} else if (!approval) {
			message.embeds[0].addField('Status', 'Rejected ❌', false)

			origin.message.edit(message.embeds[0])
			origin.message.reactions.removeAll()
		}
	} catch (e) {
		console.log(e)
	}
}

module.exports = reactionHandler
