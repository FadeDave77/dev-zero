import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';

export default class NoResultListener extends Listener {
	constructor() {
		super('noresult', {
			emitter: 'player',
			event: 'noResults',
		});
	}

	public async exec(message: Message, query: string): Promise<Message> {
		return message.util!.send('No results found for ' + query);
	}
}