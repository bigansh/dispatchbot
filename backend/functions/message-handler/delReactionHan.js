const Discord = require('discord.js')

/**
 * This function handles the reaction for a channel delete request and its procedures.
 *
 * @param {Discord.MessageReaction} origin
 * @param {Discord.Message} message
 * @returns
 */

const delReactionHan = async (origin, message) => {
	try {
		const userReactions = message.reactions.cache.map(
			(reaction) => reaction.count
		)

		const members = message.channel.name.match(/[a-z]+/gi)

		const approval = userReactions[0] - 1 > members.length / 2 ? true : false

		if (approval) {
			message.embeds[0].addField('Status', 'Approved ✅', false)

			origin.message.edit(message.embeds[0])
			origin.message.reactions.removeAll()

			await message.channel.delete('Approved by the members.')

			return
		} else if (userReactions[1] > 1) {
			message.embeds[0].addField('Status', 'Rejected ❌', false)

			await origin.message.edit(message.embeds[0])
			await origin.message.reactions.removeAll()

			return
		} else return
	} catch (e) {
		console.log(e)
	}
}

module.exports = delReactionHan
