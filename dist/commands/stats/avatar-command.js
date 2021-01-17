"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const discord_js_1 = require("discord.js");
class AvatarCommand extends discord_akairo_1.Command {
    constructor() {
        super('avatar', {
            aliases: ['avatar', 'pfp'],
            category: 'stats',
            description: {
                content: 'Get a user\'s avatar',
                usage: 'avatar <user> (size 16--2048)',
                examples: ['avatar @FadeDave#7005', 'pfp 347822600136949763 512'] //exampleArray
            },
            ratelimit: 6,
            channel: 'guild',
            args: [
                {
                    id: 'member',
                    type: 'member',
                    match: 'rest',
                    default: (msg) => msg.member
                },
                {
                    id: 'size',
                    type: (_, str) => {
                        if (str && !isNaN(Number(str)) && [16, 32, 64, 128, 256, 512, 1024, 2048].includes(Number(str)))
                            return Number(str);
                        return null;
                    },
                    match: 'option',
                    flag: ['-s', '--size'],
                    default: 2048
                }
            ]
        });
    }
    exec(message, { member, size }) {
        return message.util.send(new discord_js_1.MessageEmbed()
            .setTitle(`Avatar for ${member.user.tag}`)
            .setColor('RANDOM')
            .setImage(member.user.displayAvatarURL({ size: size })));
    }
}
exports.default = AvatarCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLWNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvc3RhdHMvYXZhdGFyLWNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBeUM7QUFDekMsMkNBQXlHO0FBRXpHLE1BQXFCLGFBQWMsU0FBUSx3QkFBTztJQUM5QztRQUNJLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDWixPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDO1lBQzFCLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFdBQVcsRUFBRTtnQkFDVCxPQUFPLEVBQUUsc0JBQXNCO2dCQUMvQixLQUFLLEVBQUUsK0JBQStCO2dCQUN0QyxRQUFRLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDLGNBQWM7YUFDbkY7WUFDRCxTQUFTLEVBQUUsQ0FBQztZQUNaLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLElBQUksRUFBRTtnQkFDRjtvQkFDSSxFQUFFLEVBQUUsUUFBUTtvQkFDWixJQUFJLEVBQUUsUUFBUTtvQkFDZCxLQUFLLEVBQUUsTUFBTTtvQkFDYixPQUFPLEVBQUUsQ0FBQyxHQUFZLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNO2lCQUN4QztnQkFDRDtvQkFDSSxFQUFFLEVBQUUsTUFBTTtvQkFDVixJQUFJLEVBQUUsQ0FBQyxDQUFVLEVBQUUsR0FBVyxFQUFpQixFQUFFO3dCQUM3QyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUFFLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNwSCxPQUFPLElBQUksQ0FBQztvQkFDaEIsQ0FBQztvQkFDRCxLQUFLLEVBQUUsUUFBUTtvQkFDZixJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDO29CQUN0QixPQUFPLEVBQUUsSUFBSTtpQkFDaEI7YUFDSjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTSxJQUFJLENBQUMsT0FBZ0IsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQXNDO1FBQzdFLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSx5QkFBWSxFQUFFO2FBQ3RDLFFBQVEsQ0FBQyxjQUFjLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDekMsUUFBUSxDQUFDLFFBQVEsQ0FBQzthQUNsQixRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFpQixFQUFDLENBQUMsQ0FBQyxDQUNyRSxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBdkNELGdDQXVDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1hbmQgfSBmcm9tICdkaXNjb3JkLWFrYWlybyc7XG5pbXBvcnQge01lc3NhZ2UsIEd1aWxkTWVtYmVyLCBNZXNzYWdlRW1iZWQsIEltYWdlU2l6ZSwgVGV4dENoYW5uZWwsIE1lc3NhZ2VBdHRhY2htZW50fSBmcm9tICdkaXNjb3JkLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXZhdGFyQ29tbWFuZCBleHRlbmRzIENvbW1hbmQge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ2F2YXRhcicsIHsgLy9uYW1lXG4gICAgICAgICAgICBhbGlhc2VzOiBbJ2F2YXRhcicsICdwZnAnXSwgLy9hbGlhc2VzXG4gICAgICAgICAgICBjYXRlZ29yeTogJ3N0YXRzJywgLy9jYXRlZ29yeSBvZiBjb21tYW5kXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICdHZXQgYSB1c2VyXFwncyBhdmF0YXInLCAvL2Rlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAgdXNhZ2U6ICdhdmF0YXIgPHVzZXI+IChzaXplIDE2LS0yMDQ4KScsIC8vaG93IHRvIHVzZVxuICAgICAgICAgICAgICAgIGV4YW1wbGVzOiBbJ2F2YXRhciBARmFkZURhdmUjNzAwNScsICdwZnAgMzQ3ODIyNjAwMTM2OTQ5NzYzIDUxMiddIC8vZXhhbXBsZUFycmF5XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmF0ZWxpbWl0OiA2LCAvL2hvdyBtYW55IHRpbWVzIGNhbiB5b3UgZXhlY3V0ZSAvIG1pbnV0ZVxuICAgICAgICAgICAgY2hhbm5lbDogJ2d1aWxkJyxcbiAgICAgICAgICAgIGFyZ3M6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnbWVtYmVyJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ21lbWJlcicsXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoOiAncmVzdCcsXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IChtc2c6IE1lc3NhZ2UpID0+IG1zZy5tZW1iZXJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdzaXplJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogKF86IE1lc3NhZ2UsIHN0cjogc3RyaW5nKTogbnVsbCB8IE51bWJlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RyICYmICFpc05hTihOdW1iZXIoc3RyKSkgJiYgWzE2LCAzMiwgNjQsIDEyOCwgMjU2LCA1MTIsIDEwMjQsIDIwNDhdLmluY2x1ZGVzKE51bWJlcihzdHIpKSkgcmV0dXJuIE51bWJlcihzdHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoOiAnb3B0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogWyctcycsICctLXNpemUnXSxcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogMjA0OFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHB1YmxpYyBleGVjKG1lc3NhZ2U6IE1lc3NhZ2UsIHttZW1iZXIsIHNpemV9OiB7bWVtYmVyOiBHdWlsZE1lbWJlciwgc2l6ZTogbnVtYmVyfSk6IFByb21pc2U8TWVzc2FnZT4ge1xuICAgICAgICByZXR1cm4gbWVzc2FnZS51dGlsLnNlbmQobmV3IE1lc3NhZ2VFbWJlZCgpXG4gICAgICAgICAgICAuc2V0VGl0bGUoYEF2YXRhciBmb3IgJHttZW1iZXIudXNlci50YWd9YClcbiAgICAgICAgICAgIC5zZXRDb2xvcignUkFORE9NJylcbiAgICAgICAgICAgIC5zZXRJbWFnZShtZW1iZXIudXNlci5kaXNwbGF5QXZhdGFyVVJMKHtzaXplOiBzaXplIGFzIEltYWdlU2l6ZX0pKVxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==