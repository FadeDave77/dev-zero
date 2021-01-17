"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
class PurgeCommand extends discord_akairo_1.Command {
    constructor() {
        super('purge', {
            aliases: ['purge', 'rm', 'clean', 'prune', 'delete', 'remove'],
            category: 'moderation',
            description: {
                content: 'Deletes specified amount of messages up to 999.',
                usage: 'rm <amount> (member)',
                examples: ['rm 420', 'rm 19', 'rm 19 @FadeDave#7005'] //exampleArray
            },
            userPermissions: ['MANAGE_MESSAGES'],
            channel: 'guild',
            ratelimit: 6,
            args: [
                {
                    id: 'amount',
                    type: 'number'
                },
                {
                    id: 'member',
                    type: 'member'
                }
            ]
        });
    }
    async exec(message, { amount, member }) {
        let channel = message.channel;
        if (member) {
            if (amount < 1 || amount > 999 || isNaN(amount) || !amount)
                return message.util.send('Please provide a valid amount of messages to delete in the 1-999 range.');
            else {
                let originalamount = amount;
                amount++;
                while (amount > 0) {
                    if (amount <= 100) {
                        await channel.messages.fetch().then(messages => messages.filter(author => author.author.id == member.user.id)).then(e => e.firstKey(amount)).then(async (messages) => {
                            await channel.bulkDelete(messages);
                            if (amount < 2)
                                await message.util.send(`Removed one message from ${member}.`);
                            if (amount >= 2)
                                await message.util.send(`Removed ${originalamount} messages from ${member}.`);
                            let toDelete = await channel.lastMessageID;
                            setTimeout(() => { message.util.lastResponse.delete().catch(() => null); message.delete().catch(() => null); }, 5000);
                        });
                        amount -= amount;
                        continue;
                    }
                    else {
                        await channel.messages.fetch().then(messages => messages.filter(author => author.author.id == member.user.id)).then(e => e.firstKey(100)).then(async (messages) => {
                            await channel.bulkDelete(messages);
                        });
                        amount -= 100;
                        continue;
                    }
                }
                ;
            }
        }
        else {
            if (amount < 1 || amount > 999 || isNaN(amount) || !amount)
                return message.util.send('Please provide a valid amount of messages to delete in the 1-999 range.');
            else {
                let originalamount = amount;
                amount++;
                while (amount > 0) {
                    if (amount <= 100) {
                        await channel.messages.fetch({ limit: amount }).then(async (messages) => {
                            await channel.bulkDelete(messages);
                            if (amount < 2)
                                await message.util.send(`Removed one message.`);
                            if (amount >= 2)
                                await message.util.send(`Removed ${originalamount} messages.`);
                            let toDelete = await channel.lastMessageID;
                            setTimeout(() => { message.util.lastResponse.delete().catch(err => null); }, 5000);
                        });
                        amount -= amount;
                        continue;
                    }
                    else {
                        await channel.messages.fetch({ limit: 100 }).then(async (messages) => {
                            await channel.bulkDelete(messages);
                        });
                        amount -= 100;
                        continue;
                    }
                }
                ;
            }
        }
    }
}
exports.default = PurgeCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVyZ2UtY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9tb2RlcmF0aW9uL3B1cmdlLWNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBeUM7QUFHekMsTUFBcUIsWUFBYSxTQUFRLHdCQUFPO0lBQzdDO1FBQ0ksS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNYLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDO1lBQzlELFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFdBQVcsRUFBRTtnQkFDVCxPQUFPLEVBQUUsaURBQWlEO2dCQUMxRCxLQUFLLEVBQUUsc0JBQXNCO2dCQUM3QixRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLHNCQUFzQixDQUFDLENBQUMsY0FBYzthQUN2RTtZQUNELGVBQWUsRUFBRSxDQUFDLGlCQUFpQixDQUFDO1lBQ3BDLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFNBQVMsRUFBRSxDQUFDO1lBQ1osSUFBSSxFQUFFO2dCQUNGO29CQUNJLEVBQUUsRUFBRSxRQUFRO29CQUNaLElBQUksRUFBRSxRQUFRO2lCQUNqQjtnQkFDRDtvQkFDSSxFQUFFLEVBQUUsUUFBUTtvQkFDWixJQUFJLEVBQUUsUUFBUTtpQkFDakI7YUFDSjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQWdCLEVBQUUsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUF3QztRQUN2RixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBc0IsQ0FBQTtRQUM1QyxJQUFJLE1BQU0sRUFBRTtZQUNSLElBQUksTUFBTSxHQUFHLENBQUMsSUFBSSxNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU07Z0JBQUUsT0FBTyxP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QU0sRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsRUFBRTs0QkFDcEUsTUFBTSxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUNuQyxJQUFJLE1BQU0sR0FBRyxDQUFDO2dDQUFFLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQzs0QkFDaEUsSUFBSSxNQUFNLElBQUksQ0FBQztnQ0FBRSxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsY0FBYyxZQUFZLENBQUMsQ0FBQzs0QkFDaEYsSUFBSSxRQUFRLEdBQUcsTUFBTSxPQUFPLENBQUMsYUFBYSxDQUFDOzRCQUMzQyxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7d0JBQUEsQ0FBQyxDQUFDLENBQUM7d0JBQ2xGLE1BQU0sSUFBSSxNQUFNLENBQUE7d0JBQ2hCLFNBQVM7cUJBQ1o7eUJBQ0k7d0JBQ0QsTUFBTSxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUU7NEJBQ2pFLE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQTt3QkFBQSxDQUFDLENBQUMsQ0FBQzt3QkFDckMsTUFBTSxJQUFJLEdBQUcsQ0FBQTt3QkFDYixTQUFTO3FCQUNaO2lCQUNKO2dCQUFBLENBQUM7YUFDTDtTQUNKO0lBQ0wsQ0FBQztDQUNKO0FBOUVELCtCQThFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1hbmQgfSBmcm9tICdkaXNjb3JkLWFrYWlybyc7XG5pbXBvcnQge01lc3NhZ2UsIEd1aWxkTWVtYmVyLCBNZXNzYWdlRW1iZWQsIEltYWdlU2l6ZSwgVGV4dENoYW5uZWwsIE1lc3NhZ2VBdHRhY2htZW50LCBVc2VyfSBmcm9tICdkaXNjb3JkLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVyZ2VDb21tYW5kIGV4dGVuZHMgQ29tbWFuZCB7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigncHVyZ2UnLCB7IC8vbmFtZVxuICAgICAgICAgICAgYWxpYXNlczogWydwdXJnZScsICdybScsICdjbGVhbicsICdwcnVuZScsICdkZWxldGUnLCAncmVtb3ZlJ10sIC8vYWxpYXNlc1xuICAgICAgICAgICAgY2F0ZWdvcnk6ICdtb2RlcmF0aW9uJywgLy9jYXRlZ29yeSBvZiBjb21tYW5kXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICdEZWxldGVzIHNwZWNpZmllZCBhbW91bnQgb2YgbWVzc2FnZXMgdXAgdG8gOTk5LicsIC8vZGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgICB1c2FnZTogJ3JtIDxhbW91bnQ+IChtZW1iZXIpJywgLy9ob3cgdG8gdXNlXG4gICAgICAgICAgICAgICAgZXhhbXBsZXM6IFsncm0gNDIwJywgJ3JtIDE5JywgJ3JtIDE5IEBGYWRlRGF2ZSM3MDA1J10gLy9leGFtcGxlQXJyYXlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1c2VyUGVybWlzc2lvbnM6IFsnTUFOQUdFX01FU1NBR0VTJ10sXG4gICAgICAgICAgICBjaGFubmVsOiAnZ3VpbGQnLFxuICAgICAgICAgICAgcmF0ZWxpbWl0OiA2LCAvL2hvdyBtYW55IHRpbWVzIGNhbiB5b3UgZXhlY3V0ZSAvIG1pbnV0ZVxuICAgICAgICAgICAgYXJnczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdhbW91bnQnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogJ21lbWJlcicsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdtZW1iZXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcHVibGljIGFzeW5jIGV4ZWMobWVzc2FnZTogTWVzc2FnZSwge2Ftb3VudCwgbWVtYmVyfToge2Ftb3VudDogbnVtYmVyLCBtZW1iZXI6IEd1aWxkTWVtYmVyfSk6IFByb21pc2U8TWVzc2FnZT4ge1xuICAgICAgICBsZXQgY2hhbm5lbCA9IG1lc3NhZ2UuY2hhbm5lbCBhcyBUZXh0Q2hhbm5lbFxuICAgICAgICBpZiAobWVtYmVyKSB7XG4gICAgICAgICAgICBpZiAoYW1vdW50IDwgMSB8fCBhbW91bnQgPiA5OTkgfHwgaXNOYU4oYW1vdW50KSB8fCAhYW1vdW50KSByZXR1cm4gbWVzc2FnZS51dGlsLnNlbmQoJ1BsZWFzZSBwcm92aWRlIGEgdmFsaWQgYW1vdW50IG9mIG1lc3NhZ2VzIHRvIGRlbGV0ZSBpbiB0aGUgMS05OTkgcmFuZ2UuJylcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBvcmlnaW5hbGFtb3VudCA9IGFtb3VudFxuICAgICAgICAgICAgICAgIGFtb3VudCsrXG4gICAgICAgICAgICAgICAgd2hpbGUgKGFtb3VudD4wKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhbW91bnQgPD0gMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBjaGFubmVsLm1lc3NhZ2VzLmZldGNoKCkudGhlbihtZXNzYWdlcyA9PiBtZXNzYWdlcy5maWx0ZXIoYXV0aG9yID0+IGF1dGhvci5hdXRob3IuaWQgPT0gbWVtYmVyLnVzZXIuaWQpKS50aGVuKGU9PiBlLmZpcnN0S2V5KGFtb3VudCkpLnRoZW4oYXN5bmMgbWVzc2FnZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgY2hhbm5lbC5idWxrRGVsZXRlKG1lc3NhZ2VzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbW91bnQgPCAyKSBhd2FpdCBtZXNzYWdlLnV0aWwuc2VuZChgUmVtb3ZlZCBvbmUgbWVzc2FnZSBmcm9tICR7bWVtYmVyfS5gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbW91bnQgPj0gMikgYXdhaXQgbWVzc2FnZS51dGlsLnNlbmQoYFJlbW92ZWQgJHtvcmlnaW5hbGFtb3VudH0gbWVzc2FnZXMgZnJvbSAke21lbWJlcn0uYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG9EZWxldGUgPSBhd2FpdCBjaGFubmVsLmxhc3RNZXNzYWdlSUQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHttZXNzYWdlLnV0aWwubGFzdFJlc3BvbnNlLmRlbGV0ZSgpLmNhdGNoKCgpID0+IG51bGwpOyBtZXNzYWdlLmRlbGV0ZSgpLmNhdGNoKCgpID0+IG51bGwpfSwgNTAwMCl9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudCAtPSBhbW91bnRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgY2hhbm5lbC5tZXNzYWdlcy5mZXRjaCgpLnRoZW4obWVzc2FnZXMgPT4gbWVzc2FnZXMuZmlsdGVyKGF1dGhvciA9PiBhdXRob3IuYXV0aG9yLmlkID09IG1lbWJlci51c2VyLmlkKSkudGhlbihlPT4gZS5maXJzdEtleSgxMDApKS50aGVuKGFzeW5jIG1lc3NhZ2VzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IGNoYW5uZWwuYnVsa0RlbGV0ZShtZXNzYWdlcyl9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudCAtPSAxMDBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChhbW91bnQgPCAxIHx8IGFtb3VudCA+IDk5OSB8fCBpc05hTihhbW91bnQpIHx8ICFhbW91bnQpIHJldHVybiBtZXNzYWdlLnV0aWwuc2VuZCgnUGxlYXNlIHByb3ZpZGUgYSB2YWxpZCBhbW91bnQgb2YgbWVzc2FnZXMgdG8gZGVsZXRlIGluIHRoZSAxLTk5OSByYW5nZS4nKVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IG9yaWdpbmFsYW1vdW50ID0gYW1vdW50XG4gICAgICAgICAgICAgICAgYW1vdW50KytcbiAgICAgICAgICAgICAgICB3aGlsZSAoYW1vdW50PjApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFtb3VudCA8PSAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IGNoYW5uZWwubWVzc2FnZXMuZmV0Y2goe2xpbWl0OiBhbW91bnR9KS50aGVuKGFzeW5jIG1lc3NhZ2VzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IGNoYW5uZWwuYnVsa0RlbGV0ZShtZXNzYWdlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYW1vdW50IDwgMikgYXdhaXQgbWVzc2FnZS51dGlsLnNlbmQoYFJlbW92ZWQgb25lIG1lc3NhZ2UuYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYW1vdW50ID49IDIpIGF3YWl0IG1lc3NhZ2UudXRpbC5zZW5kKGBSZW1vdmVkICR7b3JpZ2luYWxhbW91bnR9IG1lc3NhZ2VzLmApO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRvRGVsZXRlID0gYXdhaXQgY2hhbm5lbC5sYXN0TWVzc2FnZUlEO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7bWVzc2FnZS51dGlsLmxhc3RSZXNwb25zZS5kZWxldGUoKS5jYXRjaChlcnIgPT4gbnVsbCl9LCA1MDAwKX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50IC09IGFtb3VudFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBjaGFubmVsLm1lc3NhZ2VzLmZldGNoKHtsaW1pdDogMTAwfSkudGhlbihhc3luYyBtZXNzYWdlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBjaGFubmVsLmJ1bGtEZWxldGUobWVzc2FnZXMpfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQgLT0gMTAwXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=