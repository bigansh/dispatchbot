const Discord = require('discord.js')

/**
 * This function sends messages about a command not being allowed in a channel.
 *
 * @param {Discord.Message} message
 */

const notAllowed = async (message) => {
	try {
		await message.channel.send(
			new Discord.MessageEmbed()
				.setTitle('Request Failed')
				.setDescription(
					'Hey, this command is only executable in & on related DM channels.'
				)
				.setColor('#c98fd9')
		)
	} catch (e) {
		console.log(e)
	}
}

module.exports = notAllowed
