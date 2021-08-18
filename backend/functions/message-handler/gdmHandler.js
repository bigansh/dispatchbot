const Discord = require('discord.js')

/**
 * This command takes care of the !dis gdm command.
 *
 * @param {Discord.Message} message
 */

const gdmHandler = async (message) => {
	try {
		const mentions = message.mentions.users.map((user) => user)

		if (mentions.length === 0) {
			await message.channel.send(
				new Discord.MessageEmbed()
					.setTitle('Request Failed')
					.setDescription(
						'Hey, please mention the users you want to DM whilst making sure that they are present in the server.'
					)
					.setColor('#c98fd9')
			)

			return
		}

		if (mentions.some((user) => user.bot || user.id === message.author.id)) {
			await message.channel.send(
				new Discord.MessageEmbed()
					.setTitle('Request Failed')
					.setDescription('Hey, you cannot send yourself or a bot a DM.')
					.setColor('#c98fd9')
			)

			return
		}

		if (mentions.length === 1) {
			await message.channel.send(
				new Discord.MessageEmbed()
					.setTitle('Request Failed')
					.setDescription(
						'Hey you only mentioned a single user. If you want to message a single user, please use the \`!dis dm\` command.'
					)
					.setColor('#c98fd9')
			)

			return
		}

		if (mentions.length > 1) {
			const msg = new Discord.MessageEmbed()
				.setTitle('DM Request')
				.setDescription(
					`Folks, user ${
						message.author
					} wants to create a group DM between ${mentions.join(
						', '
					)}. If everyone approves, a DM will be created.`
				)
				.setColor('#c98fd9')

			const reply = await message.channel.send(msg)

			await Promise.all([reply.react('✅'), reply.react('❌')])

			return
		}
	} catch (e) {
		console.log(e)
	}
}

module.exports = gdmHandler
