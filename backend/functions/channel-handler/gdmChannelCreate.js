const Discord = require('discord.js')

/**
 * A function used to create a group DM channel.
 * 
 * @param {Number} clientId
 * @param {Discord.Guild} server
 * @param {Number} categoryId
 * @param {Array<Discord.User>} mentions
 */

const gdmChannelCreate = async (clientId, server, categoryId, mentions) => {
	try {
		const channel = await server.channels.create(
			mentions.map((user) => user.username).join(' ‎‎‎‎⇆ '),
			{
				parent: categoryId,
				permissionOverwrites: [
					{ id: server.id, deny: ['VIEW_CHANNEL'] },
					{ type: 'member', id: clientId, allow: ['VIEW_CHANNEL'] },
					...mentions.map((user) => ({
						type: 'member',
						id: user.id,
						allow: ['VIEW_CHANNEL'],
					})),
				],
			}
		)

		const embed = new Discord.MessageEmbed()
			.setTitle('Confirmation')
			.setDescription(
				`As requested, a DM channel has been created between ${mentions.join(
					', '
				)}!`
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

module.exports = gdmChannelCreate
