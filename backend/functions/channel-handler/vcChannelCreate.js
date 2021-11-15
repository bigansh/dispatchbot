const Discord = require('discord.js')

/**
 * A function that creates a new VC.
 *
 * @param {Discord.Client} client
 * @param {Discord.Guild} server
 * @param {Number} categoryId
 * @param {Discord.User} requested
 * @param {Discord.User} initiated
 * @param {String} reason
 */

const vcChannelCreate = async (
	client,
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
					{ type: 'member', id: client.user.id, allow: ['VIEW_CHANNEL'] },
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
					name: 'Delete',
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
			.find((channel) => channel.name === 'request-channels')
			.send(embed)

		await server.member(initiated).voice.setChannel(channel)
		await server.member(requested).voice.setChannel(channel)

		return channel

		// TODO: Create a utility channel to delete the VC when the channel becomes inactive
	} catch (e) {
		console.log(e)
	}
}

module.exports = vcChannelCreate
