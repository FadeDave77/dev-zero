import { Message, MessageEmbed, Util } from 'discord.js';
import { Listener } from 'discord-akairo';
import { Track, Queue } from 'discord-player';

export default class TrackStartListener extends Listener {
	public constructor() {
		super('trackstart', {
			emitter: 'player',
			event: 'trackStart',
		});
	}

	public async exec(message: Message, track: Track, queue: Queue): Promise<void> {
		const embed = new MessageEmbed();
		embed
			.setTitle('Now Playing')
			.setDescription(
				`[Link](${track.url})\nTitle: ${track.title}\nChannel: ${track.author}\nDuration: ${track.duration}\nRequested by: ${track.requestedBy.tag}\nTracks after this: ${
					queue.tracks.length - 1
				}`,
			)
			.setThumbnail(track.thumbnail)
			.setColor('RANDOM');
		const msg = message.util?.sendNew(embed);
		await Util.delayFor(240000);
		void (await msg)?.delete();
	}
}
