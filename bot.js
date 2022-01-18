const dotenv = require('dotenv');
const { Client, Intents, Message } = require('discord.js');
const TwitchApi = require("node-twitch").default;


let liveState = 0
//load env vars
dotenv.config({ path: './.env' })

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const PREFIX = '$';

const twitch = new TwitchApi({
    client_id: process.env.TWITCH_CLIENT_ID,
    client_secret: process.env.TWITCH_CLIENT_SECRET
});



client.on('ready', () => {
    console.log(`${client.user.tag} has logged in`)
});

client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return
    };

    // console.log(`${message.author.tag}: ${message.content}`)

    if (message.author.id == 135846420421804034) {
        return message.reply(`No one cares`)
    }

    if ((message.content) === 'hello' || (message.content) === 'Hello') {
        message.channel.send('Hello');
    }

    if ((message.content.includes('SpaceyBot')) || (message.content.includes('Spaceybot')) || (message.content.includes('spaceybot')) || (message.content.includes('spaceyBot'))) {
        // message.reply(`Dont @ me :angry:`)
        message.channel.send('@everyone');

    }

    if ((message.content) == '!down') {
        // console.log(message.author)
        message.reply(`You are ${Math.floor(Math.random() * 100)}% down bad.`)
    }
    if ((message.content) == '!sus') {
        message.reply(`You are ${Math.floor(Math.random() * 100)}% sus.`)
    }

    if ((message.content) === '!live') {
        message.channel.send('Hey @everyone, Jess is now live on https://www.twitch.tv/spaceyflower21 ! Go check it out!')
    }


    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);
        // if (CMD_NAME === 'kick') {
        //     if (args.length === 0) return (message.reply('Please provide an argument'))
        //     const member = message.guild.members.cache.get(args[0])
        //     console.log(member)
        //     message.channel.send(`${member} has been banned KEKW`)
        // }

        if (CMD_NAME === 'live') {
            if (args.length === 0) return (message.reply('Please provide an argument'))
            const checkLive = async () => {
                liveee = await goLive2(args[0])

                if (liveee) {
                    message.reply(`${liveee.data[0].user_name} is currently live at https://www.twitch.tv/${liveee.data[0].user_login} `)
                }

                else {
                    message.reply(`${args[0]} is not live!`)
                }
            }
            checkLive()
        }
    }
})

const goLive = async () => {
    const streams = await twitch.getStreams({ channel: "spaceyflower21" });
    let type = streams.data[0] || false

    if (type.type) {
        if (type.type == 'live') {
            if (liveState == 0) {
                // console.log('Live')
                liveState = 1
                const channel = await client.channels.fetch("792836781049511938");
                channel.send(`@everyone ${type.user_name} is currently live at https://www.twitch.tv/${type.user_login} `)
            }

            else {
                // console.log('Live but notification sent')
            }
        }
    }
    else {
        // console.log('offline')
        liveState = 0
    }
}

const goLive2 = async (userr) => {
    const streams = await twitch.getStreams({ channel: userr });
    let type = streams.data[0] || false
    if (type.type) {
        if (type.type == 'live') {
            return streams
        }
    }
    else {
        return false
    }
}

setInterval(goLive, 180000)

client.login(process.env.DISCORDJS_BOT_TOKEN)

