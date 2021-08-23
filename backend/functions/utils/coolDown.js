const Discord = require('discord.js')

const requestMap = new Map(),
	sentMap = new Map()

/**
 * A function to manage cool down.
 *
 * @param {Discord.Message} message
 */

const coolDown = async (message) => {
	const user = message.author.id

	let first = false

	if (!requestMap.has(user)) {
		requestMap.set(user, Date.now())
		sentMap.set(user, false)

		first = true
	}

	const previousRequestTime = requestMap.get(user),
		currentRequestTime = Date.now()

	const timeGap = (currentRequestTime - previousRequestTime) / 1000

	if (timeGap < 10 && first === false) {
		if (!sentMap.get(user)) {
			await message.channel.send(
				new Discord.MessageEmbed()
					.setTitle('Request Failed')
					.setDescription(
						'Hey, please wait at least 10 seconds before sending another request.'
					)
					.setColor('#c98fd9')
			)

			sentMap.set(user, true)

			return false
		} else return false
	} else if (timeGap >= 10 || first === true) {
		requestMap.set(user, currentRequestTime)

		setTimeout(() => {
			requestMap.delete(user)
			sentMap.delete(user)
		}, 1000 * 10)
		return true
	}
}

module.exports = coolDown
