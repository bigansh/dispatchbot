const Discord = require('discord.js')

/**
 * A function that creates a category when the bot is added.
 *
 * @param {Discord.Guild} server
 * @returns
 */

const categoryCreate = async (server) => {
	try {
		return await server.channels
			.create('direct-messages', {
				type: 'category',
			})
			.then((category) => category.id)
	} catch (e) {
		console.log(e)
	}
}

module.exports = categoryCreate
