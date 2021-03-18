import { Command } from 'discord-akairo';
import { Track } from 'discord-player';
import { MessageEmbed } from 'discord.js';
import { Message } from 'discord.js';

export default class QueueCommand extends Command {
	public constructor() {
		super('queue', {
			aliases: ['queue', 'q'],
			description: {
				content: 'Gets the queue of current server.',
				usage: 'queue',
				examples: ['queue'],
			},
			channel: 'guild',
		});
	}

	public async exec(message: Message): Promise<Message | undefined> {
		if (!this.client.voice.connections.find(e=> e.channel.guild === message.guild)) return message.util?.send('The bot is not connected!');
		if (!this.client.player.getQueue(message)) return message.util?.send('There is no queue in this server!');
		const embed = new MessageEmbed();
		embed
			.setTitle('Queue of `' + String(message.guild?.name) + '`')
			.setDescription('**`NOW PLAYING`**')
			.setColor('RANDOM');
		this.client.player
			.getQueue(message)
			.tracks.slice(0, 20).forEach((e: Track) =>
				embed.addField(
					`\`${this.client.player.getQueue(message).tracks.indexOf(e) + 1}\` ${e.title}`,
					`Channel: ${e.author}\nDuration: ${e.duration}\nRequested by: ${e.requestedBy.tag}`,
				),
			);
		embed.addField('And more:', `${this.client.player.getQueue(message).tracks.length - 20} more songs in queue.`);
		return message.util?.send(embed);
	}
}