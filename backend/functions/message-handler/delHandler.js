const Discord = require('discord.js')

/**
 * This function handles request for 'delete' command.
 *
 * @param {Discord.Message} message
 */

const delHandler = async (message) => {
	try {
		const msg = new Discord.MessageEmbed()
			.setTitle('DM Delete Request')
			.setDescription(
				`Hey, to delete a channel, more than half or all the members of the channel have to approve.`
			)
			.setColor('#c98fd9')

		const reply = await message.channel.send(msg)

		await Promise.all([reply.react('✅'), reply.react('❌')])
	} catch (e) {
		console.log(e)
	}
}

module.exports = delHandler
