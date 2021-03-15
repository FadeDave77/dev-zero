import { Listener } from 'discord-akairo';
import { OwnerId } from '../../config';

export default class UnhandledRejectionListener extends Listener {
	constructor() {
		super('unhandledrejection', {
			event: 'unhandledRejection',
			emitter: 'process',
		});
	}
	public async exec(error: string): Promise<void> {
		console.error(error);
		(await this.client.users.fetch(OwnerId)).dmChannel!.send(` I have encountered an error on ${this.client.user!.tag} @ ${new Date().toString().substr(0, 31)} o.O`);
		if (error.length >= 2000) {
			const err1 = error.slice(0, error.length / 2);
			const err2 = error.slice(error.length / 2, error.length);
			const channel = await (await this.client.users.fetch(OwnerId)).dmChannel;
			channel?.send(err1);
			channel?.send(err2);
		}
		else { (await this.client.users.fetch(OwnerId)).dmChannel!.send('`' + error + '`'); }
	}
}