const coolDown = new Map()

if (!coolDown.has(COMMAND)) coolDown.set(COMMAND, new Discord.Collection())

const currentTime = Date.now(),
	timeStamp = coolDown.get(COMMAND),
	coolDownTime = 1000 * 10

if (timeStamp.has(message.author.id)) {
	const expire = timeStamp.get(message.author.id) + coolDownTime

	if (currentTime < expire) {
		const timeLeft = (expire - currentTime) / 1000

		return message.channel.send(
			new Discord.MessageEmbed()
				.setTitle('Request Failed')
				.setDescription(
					`Hey, please wait for at least ${timeLeft} seconds before using the command.`
				)
				.setColor('#c98fd9')
		)
	}
}

timeStamp.set(message.author.id, currentTime)

setTimeout(() => timeStamp.delete(message.author.id), coolDownTime)
