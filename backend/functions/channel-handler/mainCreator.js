const Discord = require('discord.js')

const channelCreate = require('./channelCreate'),
	gdmChannelCreate = require('./gdmChannelCreate')

/**
 * This is the main creator function that takes care of creating a role and a channel for the requested.
 *
 * @param {Discord.Client} client
 * @param {Number} serverId
 * @param {Number} categoryId
 * @param {Discord.User} requested
 * @param {Discord.User} initiated
 * @param {Array<Discord.User>} mentions
 */

const mainCreator = async (
	client,
	serverId,
	categoryId,
	requested = undefined,
	initiated = undefined,
	mentions = undefined
) => {
	try {
		const server = client.guilds.cache.get(serverId),
			clientId = client.user.id

		if (requested && initiated)
			await channelCreate(clientId, server, categoryId, requested, initiated)
		else if (mentions) {
			await gdmChannelCreate(clientId, server, categoryId, mentions)
		}
	} catch (e) {
		console.log(e)
	}
}

module.exports = mainCreator