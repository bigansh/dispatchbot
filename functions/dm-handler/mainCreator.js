const Discord = require('discord.js')

const channelCreate = require('./channelCreate')

/**
 * This is the main creator function that takes care of creating a role and a channel for the requested.
 *
 * @param {Discord.Client} client
 * @param {Number} serverId
 * @param {Number} categoryId
 * @param {Discord.User} requested
 * @param {Discord.User} initiated
 */

const mainCreator = async (
	client,
	serverId,
	categoryId,
	requested,
	initiated
) => {
	try {
		const server = client.guilds.cache.get(serverId),
			clientId = client.user.id

		

		if (categoryId)
			await channelCreate(clientId, server, categoryId, requested, initiated)
	} catch (e) {
		console.log(e)
	}
}

module.exports = mainCreator
