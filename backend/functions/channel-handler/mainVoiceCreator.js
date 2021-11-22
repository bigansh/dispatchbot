const Discord = require('discord.js')

const vcChannelCreate = require('./vcChannelCreate'),
	gvcChannelCreate = require('./gvcChannelCreate')

/**
 * This is the main creator function that takes care of creating a VC for the requested members.
 *
 * @param {Discord.Client} client
 * @param {Number} serverId
 * @param {Number} categoryId
 * @param {String} reason
 * @param {Discord.User} requested
 * @param {Discord.User} initiated
 * @param {Array<Discord.User>} mentions
 */

const mainVoiceCreator = async (
	client,
	serverId,
	categoryId,
	reason = undefined,
	requested = undefined,
	initiated = undefined,
	mentions = undefined
) => {
	try {
		const server = client.guilds.cache.get(serverId)

		if (requested && initiated)
			return await vcChannelCreate(
				client,
				server,
				categoryId,
				requested,
				initiated,
				reason
			)
		else if (mentions)
			return await gvcChannelCreate(
				client,
				server,
				categoryId,
				mentions,
				reason
			)
	} catch (e) {
		console.log(e)
	}
}

module.exports = mainVoiceCreator
