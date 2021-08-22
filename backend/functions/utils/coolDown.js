const Discord = require('discord.js')

const requestMap = new Map()

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

		first = true
	}

	const previousRequestTime = requestMap.get(user),
		currentRequestTime = Date.now()

	const timeGap = (currentRequestTime - previousRequestTime) / 1000

	if (timeGap < 10 && first === false) return false
	else if (timeGap >= 10 || first === true) {
		requestMap.set(user, currentRequestTime)

		setTimeout(() => requestMap.delete(user), 1000 * 10)

		return true
	}
}

module.exports = coolDown
