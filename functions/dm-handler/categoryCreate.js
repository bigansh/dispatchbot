const categoryCreate = async (server) => {
	return await server.channels
		.create('test-channels', {
			type: 'category',
		})
		.then((category) => category.id)
}

module.exports = categoryCreate
