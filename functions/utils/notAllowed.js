const Discord = require('discord.js')

/**
 * This function sends messages about a command not being allowed in a channel.
 *
 * @param {Discord.Message} message
 */

const notAllowed = async (message) => {
	await message.channel.send(
		new Discord.MessageEmbed()
			.setTitle('Request Failed')
			.setDescription(
				'Hey, the requested command is not allowed in this channel. This command is only executable in DM channels.'
			)
	)
}

module.exports = notAllowed
