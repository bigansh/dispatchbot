const Discord = require('discord.js')

/**
 *  This function takes care of the !dis user command.
 *
 * @param {Discord.Message} message
 */

const disHandler = async (message) => {
	try {
		const mentions = message.mentions.users.map((user) => user)

		if (mentions.length > 0) {
			const channels = message.guild.channels.cache.reduce(
				(channels, { name }) => {
					if (
						name.includes(`${mentions[0].username}`) &&
						name.includes(`${message.author.username}`)
					)
						channels.push(name)

					return channels
				},
				[]
			)

			// ! Below as same is above reducing the traversal of array twice.
			// const channels = message.guild.channels.cache
			// 	.map((channel) => channel.name)

			// 	.filter(
			// 		(name) =>
			// 			name.includes(`${mentions[0].username}`) &&
			// 			name.includes(`${message.author.username}`)
			// 	)

			if (channels.length !== 0) {
				const channel = message.guild.channels.cache
					.filter((channel) => channel.name.includes(channels))
					.map((channel) => channel)[0]

				await message.channel.send(
					new Discord.MessageEmbed()
						.setTitle('Request Failed')
						.setDescription(
							'Hey, a DM with the person mentioned already exists.'
						)
						.addField('DM Channel', `${channel}`, false)
						.setColor('#c98fd9')
				)

				return
			}
		}

		if (mentions.length === 0) {
			await message.channel.send(
				new Discord.MessageEmbed()
					.setTitle('Request Failed')
					.setDescription(
						'Hey, please mention the user you want to DM whilst making sure that they are present in the server.'
					)
					.setColor('#c98fd9')
			)

			return
		}

		if (mentions[0].id === message.author.id || mentions[0].bot) {
			await message.channel.send(
				new Discord.MessageEmbed()
					.setTitle('Request Failed')
					.setDescription('Hey, you cannot send yourself or a bot a DM.')
					.setColor('#c98fd9')
			)

			return
		}

		if (mentions.length === 1) {
			const msg = new Discord.MessageEmbed()
				.setTitle('DM Request')
				.setDescription(
					`Hey ${mentions[0]}, user ${message.author} wants to DM you. Please approve or reject.`
				)
				.setColor('#c98fd9')

			const reply = await message.channel.send(msg)

			await Promise.all([reply.react('✅'), reply.react('❌')])

			return
		}

		// ! Group DM copy.
		// if (mentions.length >= 1) {
		// 	const msg = new Discord.MessageEmbed()
		// 		.setTitle('DM Request')
		// 		.setDescription(
		// 			`Folks, user ${
		// 				message.author
		// 			} wants to create a group DM between ${mentions.join(
		// 				', '
		// 			)}. If everyone approves, a DM will be created.`
		// 		)
		// 		.setColor('#c98fd9')

		// 	const reply = await message.channel.send(msg)

		// 	await Promise.all([reply.react('✅'), reply.react('❌')])

		// 	return
		// }
	} catch (e) {
		console.log(e)
	}
}

module.exports = disHandler
