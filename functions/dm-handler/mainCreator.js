const Discord = require('discord.js')

const channelCreate = require('./channelCreate')

const roleCreator = require('../permission-handler/roleCreator')

/**
 * This is the main creator function that takes care of creating a role and a channel for the requested.
 *
 * @param {Discord.Client} client
 * @param {Number} serverId
 * @param {Discord.User} requestedUser
 * @param {Discord.User} initiatedBy
 */

const mainCreator = async (client, serverId, requestedUser, initiatedBy) => {
	const server = client.guilds.cache.get(serverId)
	const categoryId = '859018201722650645'

	if (categoryId) {
		const role = await roleCreator(server, requestedUser, initiatedBy)

		const receiver = await server.members.fetch(requestedUser)
		const sender = await server.members.fetch(initiatedBy)

		await receiver.roles.add(role)
		await sender.roles.add(role)

		// await channelCreate(server, categoryId, requestedUser, initiatedBy, role)
	}
}

module.exports = mainCreator
