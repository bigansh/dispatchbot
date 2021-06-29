const Discord = require('discord.js')

/**
 * A function that removes a reaction to a message if not by the requested user.
 *
 * @param {Discord.Message} message
 * @param {Number} id
 */

const reactionRemover = async (message, id) => {
	const userReactions = message.reactions.cache.filter((reaction) =>
		reaction.users.cache.has(id)
	)

	for (const reaction of userReactions.values()) {
		await reaction.users.remove(id)
	}
}

module.exports = reactionRemover
