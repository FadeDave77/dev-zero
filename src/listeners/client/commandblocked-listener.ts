import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';

export default class CommandBlockedListener extends Listener {
    public constructor() {
        super('commandBlocked', {
            emitter: 'commandHandler',
            event: 'commandBlocked',
        });
    }
    public async exec(message: Message, command: Message, reason: string): Promise<Message> {
        if (reason == 'owner') return message.util!.reply('Only a bot owner can run this command!');
		if (reason == 'guild') return message.util!.reply('You cannot use this command in a direct message, please move to a guild!');
        return message.util!.reply('Command blocked!');
    }
}
