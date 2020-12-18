import { Command } from 'discord-akairo';
import {Message, GuildMember, MessageEmbed, ImageSize, TextChannel, MessageAttachment} from 'discord.js';
import {Repository} from 'typeorm';
import { OwnerId } from '../../config';

import { Warns } from '../../models/warns';

export default class Warn extends Command {
    public constructor() {
        super('warn', { //name
            aliases: ['warn', 'warning'], //aliases
            category: 'moderation-commands', //category of command
            description: {
                content: 'Warn users who are doing bad things.', //description
                usage: 'warn (member) <reason>', //how to use
                examples: ['warn @FadeDave#7005 he is a naughty boi'] //exampleArray
            },
            ratelimit: 3, //how many times can you execute / minute
            userPermissions: ['MANAGE_MESSAGES'],
            args: [
                {
                    id: 'member',
                    type: 'member',
                    prompt: {
                        start: (msg: Message) => `Provide a member to warn, ${msg.author}:`,
                        retry: (msg: Message) => `Provide a valid member to warn, ${msg.author}:`
                    }
                },
                {
                    id: 'reason',
                    type: 'string',
                    match: 'rest',
                    default: 'None'
                }
            ]
        });
    }
    public async exec(message: Message, {member, reason}: { member: GuildMember, reason : string }): Promise<Message> {
        const warnRepo: Repository<Warns> = this.client.db.getRepository(Warns);
        if (member.roles.highest.position >= message.member.roles.highest.position && message.author.id !== (message.guild.ownerID && OwnerId))
            return message.util.reply('The member you are trying to warn, has higher or equal roles to you!');
        await warnRepo.insert({
            guild: message.guild.id,
            user: member.id,
            moderator: message.author.id,
            reason: reason
        });
        return message.util.send(`**${member.user.tag}** has been warned by **${message.author.tag}**, with reason \`${reason}\`.`);
    };
};
