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

		const approval = userReactions[0] > 2 ? true : false

		if (approval) {
			message.embeds[0].addField('Status', 'Approved ✅', true)

			origin.message.edit(message.embeds[0])
			origin.message.reactions.removeAll()

			await message.channel.delete('Approved by the members!')
		} else if (userReactions[1] > 1) {
			message.embeds[0].addField('Status', 'Rejected ❌', true)

			origin.message.edit(message.embeds[0])
			origin.message.reactions.removeAll()
		} else return
	} catch (e) {
		console.log(e)
	}
}

module.exports = delReactionHan
