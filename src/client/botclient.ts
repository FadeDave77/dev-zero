import {AkairoClient, CommandHandler, ListenerHandler} from 'discord-akairo';
import {User, Message} from 'discord.js';
import {join} from 'path';
import { Connection } from 'typeorm';
import {Prefix, Token, OwnerId, dbName} from '../config';
import Database from '../structures/database';

declare module "discord-akairo" {
    interface AkairoClient {
        commandHandler: CommandHandler;
        listenerHandler: ListenerHandler;
        db: Connection;
    }
};

interface BotOptions {
    Token?: string;
    OwnerId?: string | string[];
};

export default class BotClient extends AkairoClient {
    public config: BotOptions;
    public db!: Connection;
    public listenerHandler: ListenerHandler = new ListenerHandler(this, {
        directory: join(__dirname, '..', 'listeners')
    });
    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: join(__dirname, '..', 'commands'),
        prefix: Prefix,
        allowMention: true,
        handleEdits: true,
        commandUtil: true,
        commandUtilLifetime: 3e5,
        defaultCooldown: 6e4,
        argumentDefaults: {
            prompt:  {
                cancelWord: 'exit',
                modifyStart: (_: Message, str: string): string => `${str}\n\nType \`exit\` to exit the prompt.`,
                modifyRetry: (_: Message, str: string): string => `${str}\n\nType \`exit\` to exit the prompt.`,
                timeout: "You didn't answer in time, the prompt exited automatically.",
                ended: "You have exceeded the maximum amount of tries, the command exited.",
                cancel: "Command cancelled.",
                retries: 3,
                time: 3e4
            },
            otherwise: ""
        },
        ignorePermissions: OwnerId
    });
    public constructor(config: BotOptions) {
        super({
            ownerID: config.OwnerId
        });
        this.config = config;
    }
    private async _init(): Promise<void> {
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            process
        });
        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();

        this.db = Database.get(dbName);
        await this.db.connect();
        await this.db.synchronize();
    };
    public async start(): Promise<string> {
        await this._init();
        return this.login(this.config.Token);
    }
}
