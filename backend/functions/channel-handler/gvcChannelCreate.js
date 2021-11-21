const Discord = require('discord.js')

/**
 * A function used to create a group DM channel.
 *
 * @param {Discord.Client} client
 * @param {Discord.Guild} server
 * @param {Number} categoryId
 * @param {Array<Discord.User>} mentions
 * @param {String} reason
 */

const gvcChannelCreate = async (
	client,
	server,
	categoryId,
	mentions,
	reason = undefined
) => {
	try {
		const channel = await server.channels.create(
			mentions.map((user) => user.username).join(' ‎‎‎‎⇆ '),
			{
				parent: categoryId,
				permissionOverwrites: [
					{ id: server.id, deny: ['VIEW_CHANNEL'] },
					{ type: 'member', id: client.user.id, allow: ['VIEW_CHANNEL'] },
					...mentions.map((user) => ({
						type: 'member',
						id: user.id,
						allow: ['VIEW_CHANNEL'],
					})),
				],
				type: 'voice',
				reason: reason,
				topic: reason,
			}
		)

		const embed = new Discord.MessageEmbed()
			.setTitle('Confirmation')
			.setDescription(
				`As requested, a VC has been created for ${requested} & ${initiated}!`
			)
			.addFields(
				{
					name: 'Delete Warning',
					value:
						'As soon as all the members of this VC leave, the channel will be deleted.',
					inline: false,
				},
				{
					name: 'Disclaimer',
					value: 'Please note that admins can join this VC.',
					inline: false,
				}
			)
			.setColor('#c98fd9')

		await server.channels.cache
			.find((channel) => channel.name.includes('request-channels'))
			.send(embed)

		mentions.forEach(async (member) => {
			await server.member(member).voice.setChannel(channel)
		})

		return channel
	} catch (e) {
		console.log(e)
	}
}

module.exports = gvcChannelCreate
