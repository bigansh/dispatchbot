const roleCreator = async (server, requestedBy, initiatedBy) => {
	return await server.roles.create({
		data: {
			name: `${initiatedBy.username} ‎‎‎‎⇆ ${requestedBy.username}`,
		},
	})
}

module.exports = roleCreator
