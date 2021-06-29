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
	return await server.roles.create({
		data: {
			name: `${initiatedBy.username} ‎‎‎‎⇆ ${requestedBy.username}`,
		},
	})
}

module.exports = roleCreator
