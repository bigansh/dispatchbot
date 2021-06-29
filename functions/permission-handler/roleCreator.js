const Discord = require('discord.js')

/**
 * A function that creates a role for the requested DM.
 *
 * @param {Discord.Guild} server
 * @param {Discord.User} requestedBy
 * @param {Discord.User} initiatedBy
 * @returns
 */

const roleCreator = async (server, requestedBy, initiatedBy) => {
	try {
		return await server.roles.create({
			data: {
				name: `${initiatedBy.username} ‎‎‎‎⇆ ${requestedBy.username}`,
			},
		})
	} catch (e) {
		console.log(e)
	}
}

module.exports = roleCreator

// ! Using the roleCreator function.
// const roleCreator = require('../permission-handler/roleCreator')

// const role = await roleCreator(server, requestedUser, initiatedBy)

// const receiver = await server.members.fetch(requestedUser)
// const sender = await server.members.fetch(initiatedBy)

// await receiver.roles.add(role)
// await sender.roles.add(role)
