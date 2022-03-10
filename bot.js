const dotenv = require('dotenv');
const axios = require('axios');
const { Client, Intents, Message } = require('discord.js');
const TwitchApi = require("node-twitch").default;
const humanizeDuration = require("humanize-duration");
const { expDadJoke, expJoke } = require('./commands/joke')
const { expCheckLive } = require('./commands/twitch')
const { expBan, expDown, expPetty, expToxic } = require('./commands/basic')


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

client.on('messageCreate', async (message) => {
    if (message.author.bot) {
        return
    };

    // console.log(`${message.author.tag}: ${message.content}`)

    // if (message.author.id == 135846420421804034) {
    //     return message.reply(`No one cares`)
    // }

    // if (message.channelId == 801933050949926984) {
    //     return message.channel.send(`:eyes:`)
    // }

    if ((message.content).toLowerCase() == 'hello') {
        message.channel.send('Hello');
    }

    if ((message.content.toLowerCase().includes('spaceybot'))) {
        message.reply(`Dont @ me :angry:`)

    }

    if ((message.content.includes('@932996374562238474')) || (message.content.includes('<@!932996374562238474>'))) {
        if (message.content.includes('!ban')) {

        }
        else {
            message.reply(` What??? :face_with_raised_eyebrow:`)
        }
        // message.reply(` What??? :face_with_raised_eyebrow:`)
        // message.channel.send('@everyone');

    }

    if ((message.content.toLowerCase().includes('good morning'))) {
        message.channel.send(`Good morning <@${message.author.id}>`)
        // message.channel.send('@everyone');

    }

    if ((message.content.toLowerCase().includes('ok bye'))) {
        message.channel.send(`https://tenor.com/view/bye-okay-slide-gif-15172486`)
        // message.channel.send('@everyone');

    }

    if ((message.content.toLowerCase().includes('ok hi'))) {
        message.channel.send(`https://tenor.com/view/ok-hi-hi-hello-ok-bye-ok-hi-kid-gif-19799968`)
        // message.channel.send('@everyone');

    }


    // if ((message.content) == '!down') {
    //     // console.log(message.author)
    //     message.reply(`You are ${Math.floor(Math.random() * 100)}% down bad.`)
    // }

    if ((message.content) == '!gabe') {
        message.channel.send(`https://tenor.com/view/player-playa-youre-a-player-youre-a-playa-dave-chappelle-gif-4728520`)
    }
    if ((message.content) == '!21') {
        message.reply(`SKRAIGHT UP`)
    }
    if ((message.content) == '!9+10') {
        message.reply(`21 :SpaceyHype:`)
    }

    if ((message.content) == '!sus') {
        message.reply(`You are ${Math.floor(Math.random() * 100)}% sus.`)
    }

    if ((message.content) === '!live') {
        message.channel.send('Hey @everyone, Jess is now live on https://www.twitch.tv/spaceyflower21 ! Go check it out!')
    }
    if ((message.content) === '!ben') {
        message.channel.send('Super clutch :slight_smile:')
    }

    //HEROKU ERROR OCCURED PUSH OF THIS SECTION ? ROLLBACK?
    if ((message.content) === '!cap') {
        message.channel.send('Fat Cock')
    }
    // if ((message.content) === '!sno') {
    //     message.channel.send('hmm hook me up mijah')
    // }



    if ((message.content) === '!map') {

        if (message.channelId == 801881827916513320 || message.channelId == 803352079519318098 || message.channelId == 933130158595002371) {
            const getCurrentMap = async () => {
                let current_map = await getMap()
                const emoji = {
                    worlds_edge_rotation: ':slight_smile:',
                    storm_point_rotation: ':unamused:',
                    olympus_rotation: ':heart_eyes:',
                    kings_canyon_rotation: ':neutral_face:'

                }

                // console.log(current_map.battle_royale.current.)
                let timee = humanizeDuration(current_map.battle_royale.current.remainingMins * 60000, { delimiter: " and ", units: ["d", "h", "m"] });
                let next_timee = humanizeDuration(current_map.battle_royale.next.DurationInMinutes * 60000, { delimiter: " and ", units: ["d", "h", "m"] });
                // const mp = current_map.battle_royale.current.code
                // console.log(`${mp}`)
                // const test = 'worlds_edge_rotation'
                // console.log(`${emoji.test}`)
                message.channel.send(`Current Map: ${current_map.battle_royale.current.map}, ${timee}  \nNext Map: ${current_map.battle_royale.next.map}, ${next_timee}`)
            }
            getCurrentMap()
        }

        else {
            message.channel.send(`This command only works in the gaming channel :unamused:`)
        }
    }

    if (message.content.startsWith('!')) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);

        if (CMD_NAME === 'toxic') {
            let toxicMessage = expToxic(message, args[0])
            message.channel.send(toxicMessage)
        }

        if (CMD_NAME === 'petty') {
            let pettyMessage = expPetty(message, args[0])
            message.channel.send(pettyMessage)

        }

        if (CMD_NAME === 'down') {
            let downMessage = expDown(message, args[0])
            message.channel.send(downMessage)

        }

        if (CMD_NAME === 'ban') {
            let banMessage = expBan(message, args[0])
            message.channel.send(banMessage)

        }
    }


    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);


        if (CMD_NAME === 'live') {
            if (args.length === 0) return (message.reply('Please provide a valid twitch channel'))

            let checkLive = await expCheckLive(args[0])
            message.reply(checkLive)
        }

        if (CMD_NAME === 'joke') {
            let exportedJoke = await expJoke()
            message.reply(exportedJoke)

        }

        if (CMD_NAME === 'dadjoke') {
            let exportedDadJoke = await expDadJoke()
            message.reply(exportedDadJoke)
        }
    }
})

const goLive = async () => {
    console.log('Checking.....')
    const streams = await twitch.getStreams({ channel: "spaceyflower21" });
    let type = streams.data[0] || false


    if (type.type) {
        if (type.type == 'live') {
            const stream_started = streams.data[0].started_at
            const stream_start_time = new Date(stream_started)
            const streamstart_plus6minutes = new Date(stream_start_time.getTime() + 4 * 60000);

            const current_time = new Date();
            if (liveState == 0) {
                if (streamstart_plus6minutes.getTime() > current_time.getTime()) {
                    // console.log('Live')
                    liveState = 1
                    const channel = await client.channels.fetch("792836781049511938");
                    channel.send(`@everyone ${type.user_name} is currently live at https://www.twitch.tv/${type.user_login} `)
                }

                else {
                    liveState = 1
                }

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

const getMap = async () => {
    try {
        let mapp = await axios.get(`https://api.mozambiquehe.re/maprotation?version=5&auth=${process.env.APEX_LEGENDS_API_KEY}`)
        let map_data = mapp.data
        return map_data
    } catch (e) {
        console.error(e)
    }
}


setInterval(goLive, 180000)

client.login(process.env.DISCORDJS_BOT_TOKEN)

