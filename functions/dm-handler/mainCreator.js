const channelCreate = require('./channelCreate')

const roleCreator = require('../permission-handler/roleCreator')

const mainCreator = async (client, serverId, requestedUser, initiatedBy) => {
	const server = client.guilds.cache.get(serverId)
	const categoryId = '859018201722650645'

	if (categoryId) {
		const role = await roleCreator(server, requestedUser, initiatedBy)

		const receiver = await server.members.fetch(requestedUser)
		const sender = await server.members.fetch(initiatedBy)

		await receiver.roles.add(role)
		await sender.roles.add(role)

		console.log(role)

		// await channelCreate(server, categoryId, requestedUser, initiatedBy, role)
	}
}

module.exports = mainCreator
