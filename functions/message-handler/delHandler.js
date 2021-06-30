const Discord = require('discord.js')

/**
 * This function handles request for !dis delete command.
 *
 * @param {Discord.Message} message
 */

const delHandler = async (message) => {
	try {
		const mentions = message.mentions.channels.map((channel) => channel.id)

		if (mentions.length === 0) {
			await message.channel.send(
				new Discord.MessageEmbed()
					.setTitle('Request Failed')
					.setDescription('Hey, please mention the channel you want to delete.')
			)

			return
		}

		const msg = new Discord.MessageEmbed()
			.setTitle('DM Delete Request')
			.setDescription(
				`Hey, to delete a channel, all the members of the channel have to approve.`
			)

		const reply = await message.channel.send(msg)

		await Promise.all([reply.react('✅'), reply.react('❌')])
	} catch (e) {
		console.log(e)
	}
}

module.exports = delHandler
