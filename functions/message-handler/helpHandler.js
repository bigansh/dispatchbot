const Discord = require('discord.js')

/**
 * This function sends messages about help command.
 *
 * @param {Discord.Message} message
 */

const helpHandler = async (message) => {
	try {
		await message.channel.send(
			new Discord.MessageEmbed()
				.setTitle('Dispatch Help')
				.setDescription(
					'Hey, all the commands that this bot can understand are listed below.'
				)
				.addFields([
					{
						name: 'DM a user',
						value: '!dis dm @user',
						inline: false,
					},
					{
						name: 'Delete a DM channel',
						value: '!dis del',
						inline: false,
					},
					{
						name: 'Menu',
						value: '!dis help',
						inline: false,
					},
				])
				.setColor('#c98fd9')
		)
	} catch (e) {
		console.log(e)
	}
}

module.exports = helpHandler
