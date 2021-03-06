const Discord = require('discord.js')

/**
 * A function that creates a new channel.
 *
 * @param {Number} clientId
 * @param {Discord.Guild} server
 * @param {Number} categoryId
 * @param {Discord.User} requested
 * @param {Discord.User} initiated
 * @param {String} reason
 */

const channelCreate = async (
	clientId,
	server,
	categoryId,
	requested,
	initiated,
	reason = undefined
) => {
	try {
		const channel = await server.channels.create(
			`${initiated.username} ‎‎‎‎⇆ ${requested.username}`,
			{
				parent: categoryId,
				permissionOverwrites: [
					{ id: server.id, deny: ['VIEW_CHANNEL'] },
					{ type: 'member', id: requested.id, allow: ['VIEW_CHANNEL'] },
					{ type: 'member', id: initiated.id, allow: ['VIEW_CHANNEL'] },
					{ type: 'member', id: clientId, allow: ['VIEW_CHANNEL'] },
				],
				reason: reason,
				topic: reason,
			}
		)

		const embed = new Discord.MessageEmbed()
			.setTitle('Confirmation')
			.setDescription(
				`As requested, a DM channel has been created for ${requested} & ${initiated}!`
			)
			.addFields(
				{
					name: 'Delete',
					value: 'To delete this DM, just type `!dis del` here.',
					inline: false,
				},
				{
					name: 'Disclaimer',
					value: 'Please note that admins can see this chat.',
					inline: false,
				}
			)
			.setColor('#c98fd9')

		await channel.send(embed)
	} catch (e) {
		console.log(e)
	}
}

module.exports = channelCreate
