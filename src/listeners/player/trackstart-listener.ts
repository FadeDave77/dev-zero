import { Message, MessageEmbed } from 'discord.js';
import { Listener } from 'discord-akairo';
import { Track } from 'discord-player';

export default class TrackStartListener extends Listener {
	public constructor() {
		super('trackstart', {
			emitter: 'player',
			event: 'trackStart',
		});
	}

	public async exec(message: Message, track: Track): Promise<Message | undefined> {
		const embed = new MessageEmbed();
		embed
			.setTitle('Now Playing')
			.setDescription(
				`[Link](${track.url})\nTitle: ${track.title}\nChannel: ${track.author}\nDuration: ${track.duration}\nRequested by: ${track.requestedBy.tag}\nTracks after this: ${
					track.queue?.tracks.length - 1
				}`,
			)
			.setThumbnail(track.thumbnail)
			.setColor('RANDOM');
		return message.util?.sendNew(embed);
	}
}
