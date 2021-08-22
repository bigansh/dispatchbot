const Discord = require('discord.js')

/**
 * This function creates a DM request channel where users can request for a DM.
 *
 * @param {Discord.Guild} server
 * @param {Number} categoryId
 */

const requestChannelCreate = async (server, categoryId) => {
	try {
		await server.channels.create('request-dm', {
			parent: categoryId,
			rateLimitPerUser: 1000 * 10,
		})
	} catch (e) {
		console.log(e)
	}
}

module.exports = requestChannelCreate
