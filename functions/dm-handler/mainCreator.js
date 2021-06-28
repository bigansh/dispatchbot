const channelCreate = require('./channelCreate')

const mainCreator = async (client, serverId, requestedUser, initiatedBy) => {
	const server = client.guilds.cache.get(serverId)
	const categoryId = '859018201722650645'

	if (categoryId) channelCreate(server, categoryId, requestedUser, initiatedBy)
}

// const categoryId = await categoryCreate(server)

module.exports = mainCreator
