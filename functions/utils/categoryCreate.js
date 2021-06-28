const categoryCreate = async (server) => {
	return await server.channels
		.create('direct-messages', {
			type: 'category',
		})
		.then((category) => category.id)
}

module.exports = categoryCreate
