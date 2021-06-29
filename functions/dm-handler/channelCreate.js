const Discord = require('discord.js')

/**
 * A function that creates a new channel.
 *
 * @param {Discord.Guild} server
 * @param {Number} categoryId
 * @param {Discord.User} requestedBy
 * @param {Discord.User} initiatedBy
 * @param {Discord.GuildMemberRoleManager} role
 */

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
				{ id: role, allow: role.id, deny: ['VIEW_CHANNEL'] },
			],
		}
	)

	const embed = new Discord.MessageEmbed()
		.setTitle('Confirmation')
		.setDescription(
			`As requested, a DM channel has been created for ${requestedBy} & ${initiatedBy}!`
		)

	await channel.send(embed)
}

module.exports = channelCreate
