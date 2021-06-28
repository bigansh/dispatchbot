const reactionRemover = async (message, id) => {
	const userReactions = message.reactions.cache.filter((reaction) =>
		reaction.users.cache.has(id)
	)

	for (const reaction of userReactions.values()) {
		await reaction.users.remove(id)
	}
}

module.exports = reactionRemover
