const Discord = require('discord.js')

/**
 * This function sends messages about 'help' command.
 *
 * @param {Discord.Message} message
 */

const helpHandler = async (message) => {
	try {
		await message.channel.send(
			new Discord.MessageEmbed()
				.setTitle('Help')
				.setDescription(
					'Hey, all the commands that this bot can understand are listed below.'
				)
				.addFields([
					{
						name: 'DM a user',
						value: '`!dis dm @user reason(optional)`',
						inline: false,
					},
					{
						name: 'DM a group',
						value: '`!dis gdm @user, @user, etc. reason(optional)`',
						inline: false,
					},
					{
						name: 'Delete a DM',
						value: '`!dis del`',
						inline: false,
					},
					{
						name: 'VC a user',
						value: '`!dis vc @user reason(optional)`',
						inline: false,
					},
					{
						name: 'VC a group',
						value: '`!dis gvc @user, @user, etc. reason(optional)`',
						inline: false,
					},
					{
						name: 'Help',
						value: '`!dis help`',
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
