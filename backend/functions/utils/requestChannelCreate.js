const Discord = require('discord.js')

/**
 * This function creates a DM request channel where users can request for a DM.
 *
 * @param {Discord.Guild} server
 * @param {Number} categoryId
 */

const requestChannelCreate = async (server, categoryId) => {
	try {
		await server.channels.create('request-channels', {
			parent: categoryId,
			rateLimitPerUser: 10,
		})

		await server.channels.create('lobby', {
			parent: categoryId,
			type: 'voice'
		})
	} catch (e) {
		console.log(e)
	}
}

module.exports = requestChannelCreate
