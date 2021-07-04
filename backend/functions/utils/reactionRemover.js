const Discord = require('discord.js')

/**
 * A function that removes a reaction to a message if not by the requested user.
 *
 * @param {Discord.Message} message
 * @param {Number} id
 */

const reactionRemover = async (message, id) => {
	try {
		const userReactions = message.reactions.cache.filter((reaction) =>
			reaction.users.cache.has(id)
		)

		for (const reaction of userReactions.values()) {
			await reaction.users.remove(id)
		}
	} catch (e) {
		console.log(e)
	}
}

module.exports = reactionRemover
