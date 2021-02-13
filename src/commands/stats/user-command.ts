import { Command } from 'discord-akairo';
import {Message, GuildMember, MessageEmbed, ImageSize, TextChannel, MessageAttachment, User} from 'discord.js';

export default class UserCommand extends Command {
    public constructor() {
        super('user', { //name
            aliases: ['user', 'member'], //aliases
            category: 'stats', //category of command
            description: {
                content: 'Get the stats of a user.', //description
                usage: 'user (user)', //how to use
                examples: ['user', 'user @FadeDave#7005'] //exampleArray
            },
            ratelimit: 6, //how many times can you execute / minute
            args: [
                {
                    id: 'user',
                    type: 'user',
                    match: 'rest',
                    default: (msg: Message) => msg.author
                }
            ]
        });
    }
    public exec(message: Message, {user}: {user: User}): Promise<Message> {
        const embed = new MessageEmbed()
        .setTitle(`Userinfo for \`${user.tag}\``)
        .setColor("RANDOM")
        .setDescription(`
        **Created at:** ${user.createdAt.toString().substr(4, 27)}\n
        **UserID:** ${user.id}\n
        **IsBot:** ${user.bot}\n
        **Status:** ${user.presence.status}

        **Avatar:**`)
        .setImage(user.avatarURL());
        return message.util.send(embed);
    }
}
