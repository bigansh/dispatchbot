const Discord = require('discord.js')

/**
 *  This function takes care of the !dis user command.
 *
 * @param {Discord.Message} message
 */

const disHandler = async (message) => {
	try {
		const mentions = message.mentions.users.map((user) => user)

		if (mentions[0].id === message.author.id) {
			await message.channel.send(
				new Discord.MessageEmbed()
					.setTitle('Request Failed')
					.setDescription('Hey, you cannot send yourself a DM.')
					.setColor('#c98fd9')
			)

			return
		}

		if (mentions.length === 0) {
			await message.channel.send(
				new Discord.MessageEmbed()
					.setTitle('Request Failed')
					.setDescription('Hey, please mention the user you want to DM.')
					.setColor('#c98fd9')
			)

			return
		}

		const msg = new Discord.MessageEmbed()
			.setTitle('DM Request')
			.setDescription(
				`Hey ${mentions[0]}, user ${message.author} wants to DM you. Please approve or reject.`
			)
			.setColor('#c98fd9')

		const reply = await message.channel.send(msg)

		await Promise.all([reply.react('✅'), reply.react('❌')])
	} catch (e) {
		console.log(e)
	}
}

module.exports = disHandler
