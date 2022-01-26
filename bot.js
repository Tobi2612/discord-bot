const dotenv = require('dotenv');
const axios = require('axios');
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
        yy
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

    if ((message.content) == '!down') {
        // console.log(message.author)
        message.reply(`You are ${Math.floor(Math.random() * 100)}% down bad.`)
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

    if ((message.content) === '!map') {
        if (message.channelId == 801881827916513320 || message.channelId == 803352079519318098 || message.channelId == 933130158595002371) {
            const getCurrentMap = async () => {
                let current_map = await getMap()
                if (current_map.battle_royale.current.remainingMins >= 120 && current_map.battle_royale.current.remainingMins < 180) {
                    remaining_time = current_map.battle_royale.current.remainingMins - 120
                    timee = `2 hours and ${remaining_time}`
                }
                else if (current_map.battle_royale.current.remainingMins >= 60 && current_map.battle_royale.current.remainingMins < 120) {
                    remaining_time = current_map.battle_royale.current.remainingMins - 60
                    timee = `1 hour and ${remaining_time}`
                }

                else if (current_map.battle_royale.current.remainingMins < 60) {
                    remaining_time = current_map.battle_royale.current.remainingMins
                    timee = `${remaining_time}`
                }

                else {
                    remaining_time = current_map.battle_royale.current.remainingMins
                    timee = `${remaining_time}`
                }

                message.channel.send(`Current map is ${current_map.battle_royale.current.map} and rotates in ${timee} minutes :slight_smile:`)
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

        //HEROKU ERROR OCCURED PUSH OF THIS SECTION ? ROLLBACK?
        if (CMD_NAME === 'ban') {
            // let conv = [...args[0]]
            let conv2 = args[0]
            // // let nooo = parseInt(args[0])
            // // console.log(`Conv to array: ${nooo}`)
            // conv.pop()
            // conv2 = conv.slice(3)
            // let strr = conv2.join('')
            // console.log(`Conv before regex: ${conv2}`)


            let new_conv = conv2.replace(/[\\<>@#&!]/g, "");
            // console.log(`Conv to array: ${conv}`)
            // console.log(`Conv after regex: ${new_conv}`)
            if (new_conv == '932996374562238474') {
                return message.reply(`Ban who??? :rofl: :rofl:`)
            }
            const member = message.guild.members.cache.get(new_conv)

            console.log(member)
            const banMessage = [
                'sike nerd :rofl:',
                'has been sent into the void KEKW',
                'https://tenor.com/view/moe-simpsons-barney-e-moe-gif-23054386',
                'https://tenor.com/view/among-us-ban-among-us-ban-imposter-ban-gif-18884723',
                'https://tenor.com/view/spongebob-ban-pubg-lite-banned-rainbow-gif-16212382',
                'https://tenor.com/view/bongocat-banhammer-ban-hammer-bongo-gif-18219363',
                'https://tenor.com/view/moe-simpsons-barney-e-moe-gif-23054386',
                'https://tenor.com/view/mario-yoshi-hammer-hit-gif-14834810',
                'https://tenor.com/view/go-home-leave-golden-girls-just-go-you-have-to-go-now-gif-22287144',
                'https://tenor.com/view/throw-him-out-gif-14876020',
                'https://tenor.com/view/moe-simpsons-barney-e-moe-gif-23054386',
                'https://tenor.com/view/gtfo-fresh-prince-thrown-out-kicked-out-gif-5919348',
                'https://tenor.com/view/get-out-out-close-door-gif-12559327',
                'https://tenor.com/view/kicked-out-kicked-thrown-out-get-out-of-the-house-gif-23257249',
                'https://tenor.com/view/fail-bounce-mattress-bed-prank-gif-13006950',
                'https://tenor.com/view/drag-dragging-gif-11404125',
                'https://tenor.com/view/fire-throw-out-kick-kick-out-boot-out-gif-15900658',
                'https://tenor.com/view/moe-simpsons-barney-e-moe-gif-23054386',
            ]
            if (member) {
                min = Math.ceil(0);
                max = Math.floor((banMessage.length) - 1);
                let banRandom = Math.floor(Math.random() * (max - min + 1)) + min;
                message.channel.send(`${member} ${banMessage[banRandom]}`)
            }

            else {
                message.reply(`Ban who??? :neutral_face:`)
            }
        }
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

        if (CMD_NAME === 'joke') {
            const getJoke = async () => {
                let jokes = await getJokes('joke')

                if (jokes.error == true) {
                    message.reply(`I don't have a joke for you at the moment, try again in a minute! \nMy bad :neutral_face:`)
                }
                if (jokes.type == 'single') {
                    message.reply(`${jokes.joke}`)
                }

                if (jokes.type == 'twopart') {
                    message.reply(`${jokes.setup} \n\n\n ${jokes.delivery}`)
                }

            }
            getJoke()
        }

        if (CMD_NAME === 'dadjoke') {
            const getDadJoke = async () => {
                let jokes = await getJokes('dadjoke')

                if (jokes) {
                    if (jokes.status == 200) {
                        message.reply(`${jokes.joke}`)
                    }
                }

                else {
                    message.reply(`I don't have a joke for you at the moment, try again in a minute! \nMy bad :neutral_face:`)
                }

            }
            getDadJoke()
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

const getMap = async () => {
    try {
        let mapp = await axios.get(`https://api.mozambiquehe.re/maprotation?version=5&auth=${process.env.APEX_LEGENDS_API_KEY}`)
        let map_data = mapp.data
        return map_data
    } catch (e) {
        console.error(e)
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

const getJokes = async (type_of_joke) => {
    if (type_of_joke == 'joke') {
        try {
            let response = await axios.get('https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,political,racist,sexist')
            let joke = response.data
            return joke
        } catch (e) {
            // console.error(e)
        }
    }

    if (type_of_joke == 'dadjoke') {
        try {
            const options = {
                headers: {
                    'Accept': 'application/json',
                    "User-Agent": "axios 0.21.1"
                }
            }
            let dad_response = await axios.get('https://icanhazdadjoke.com/', options)

            let dadjoke = dad_response.data
            // console.log(dadjoke)
            return dadjoke

        } catch (e) {
            // console.error(e)
        }
    }
}

setInterval(goLive, 180000)

client.login(process.env.DISCORDJS_BOT_TOKEN)

