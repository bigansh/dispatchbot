const { MessageEmbed } = require('discord.js')

const channelCreate = async (
	server,
	categoryId,
	requestedBy,
	initiatedBy,
	role
) => {
	const channel = await server.channels.create(
		`${initiatedBy.username} ‎‎‎‎⇆ ${requestedBy.username}`,
		{
			parent: categoryId,
			permissionOverwrites: [
				{ id: role.permission.bitfield, allow: role.id, deny: ['VIEW_CHANNEL'] },
			],
		}
	)

	const embed = new MessageEmbed()
		.setTitle('Confirmation')
		.setDescription(
			`As requested, a DM channel has been created for ${requestedBy} & ${initiatedBy}!`
		)

	await channel.send(embed)
}

module.exports = channelCreate
