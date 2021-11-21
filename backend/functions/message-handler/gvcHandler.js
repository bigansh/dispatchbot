const Discord = require('discord.js'),
	{ sentenceCase } = require('sentence-case')

/**
 * This function handles the '!dis gvc' command & its procedures.
 *
 * @param {Discord.Message} message
 */

const gvcHandler = async (message) => {
	try {
		const mentions = message.mentions.users.map((user) => user)

		let reason = message.content.toLowerCase().match(/([a-z]+( [a-z]+)+)/gi)[1]

		if (reason) reason = sentenceCase(reason)

		const vcLobby = message.channel.guild.channels.cache
			.filter(
				(channel) =>
					channel.name.includes('lobby') &&
					channel.type === 'voice' &&
					channel.parentID === message.channel.parentID
			)
			.first()

		if (mentions.length === 0) {
			await message.channel.send(
				new Discord.MessageEmbed()
					.setTitle('Request Failed')
					.setDescription(
						'Hey, please mention the user you want to create a VC with whilst making sure that they are present in the server.'
					)
					.setColor('#c98fd9')
			)

			return
		}

		if (mentions[0].id === message.author.id || mentions[0].bot) {
			await message.channel.send(
				new Discord.MessageEmbed()
					.setTitle('Request Failed')
					.setDescription(
						'Hey, you cannot ask for a VC with a bot or for yourself.'
					)
					.setColor('#c98fd9')
			)

			return
		}

        if (mentions.length === 1) {
			await message.channel.send(
				new Discord.MessageEmbed()
					.setTitle('Request Failed')
					.setDescription(
						'Hey you only mentioned a single user. If you want to VC a single user, please use the `!dis vc` command.'
					)
					.setColor('#c98fd9')
			)

			return
		}

		if (mentions.length > 1) {
			const msg = new Discord.MessageEmbed()
				.setTitle('VC Request')
				.setDescription(
					`Folks, user ${
						message.author
					} wants to create a group VC between ${mentions.join(
						', '
					)}. If everyone approves, a VC will be created.`
				)
				.addField(
					'Note',
					`All the entities have to join the ${vcLobby} VC in-oder for the request to be successful.`,
					false
				)
				.setColor('#c98fd9')

			if (reason) msg.addField('Reason', reason, false)

			const reply = await message.channel.send(msg)

			await Promise.all([reply.react('✅'), reply.react('❌')])

			return
		}
	} catch (e) {
		console.log(e)
	}
}

module.exports = gvcHandler
