const Discord = require('discord.js')

const channelCreate = require('./channelCreate')

/**
 * This is the main creator function that takes care of creating a role and a channel for the requested.
 *
 * @param {Discord.Client} client
 * @param {Number} serverId
 * @param {Discord.User} requestedBy
 * @param {Discord.User} initiatedBy
 */

const mainCreator = async (client, serverId, requestedBy, initiatedBy) => {
	try {
		const server = client.guilds.cache.get(serverId)
		const categoryId = '859018201722650645'

		if (categoryId)
			await channelCreate(server, categoryId, requestedBy, initiatedBy)
	} catch (e) {
		console.log(e)
	}
}

module.exports = mainCreator
