const Discord = require('discord.js'),
	{ sentenceCase } = require('sentence-case')

/**
 *  This function takes care of the 'dm' user command.
 *
 * @param {Discord.Message} message
 */

const disHandler = async (message) => {
	try {
		const mentions = message.mentions.users.map((user) => user)

		let reason = message.content.toLowerCase().match(/([a-z]+( [a-z]+)+)/gi)[1]

		if (reason) reason = sentenceCase(reason)

		if (mentions.length > 0) {
			const channels = message.guild.channels.cache.reduce(
				(channels, { name }) => {
					if (
						name.includes(
							`${mentions[0].username.toLowerCase()}-⇆-${message.author.username.toLowerCase()}`
						) ||
						name.includes(
							`${message.author.username.toLowerCase()}-⇆-${mentions[0].username.toLowerCase()}`
						)
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
			// 			name.includes(
			// 				`${mentions[0].username}-‎‎‎‎⇆-${message.author.username}`
			// 			) ||
			// 			name.includes(
			// 				`${message.author.username}-‎‎‎‎⇆-${mentions[0].username}`
			// 			)
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

			if (reason) msg.addField('Reason', reason, false)

			const reply = await message.channel.send(msg)

			await Promise.all([reply.react('✅'), reply.react('❌')])

			return
		}

		if (mentions.length > 1) {
			await message.channel.send(
				new Discord.MessageEmbed()
					.setTitle('Request Failed')
					.setDescription(
						'Hey, you mentioned more than one user. If you want to create a group DM, please use the `!dis gdm` command.'
					)
					.setColor('#c98fd9')
			)

			return
		}
	} catch (e) {
		console.log(e)
	}
}

module.exports = disHandler
