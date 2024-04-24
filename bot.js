const dotenv = require('dotenv');
const axios = require('axios');
const connectDB = require('./config/db')
const { Client, Intents, Message } = require('discord.js');
const TwitchApi = require("node-twitch").default;
const humanizeDuration = require("humanize-duration");
const { expDadJoke, expJoke } = require('./commands/joke')
const { expCheckLive } = require('./commands/twitch')
const { expBan } = require('./commands/basic');
const { createCommand, updateCommand, deleteCommand, readCommand } = require('./commands/db_commands');


let liveState = 0
//load env vars
dotenv.config({ path: './.env' })

connectDB()

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



    // DB SECTION

    if (message.content.startsWith('!')) {
        const [CMD_NAME, ...args] = message.content.toLowerCase()
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);

        if (CMD_NAME === 'cmd') {
            let owner = message.member.roles.cache.has('802217873438277673');
            let test_server_role = message.member.roles.cache.has('988454685704847380');
            let spacecadets = message.member.roles.cache.has('802218250062528513');
            let admin = message.member.roles.cache.has('802217425323556874');
            let new_role = message.member.roles.cache.has('859049470906204180');

            let body = {
                created_by: message.author.id,
                cmd_name: args[1],
                guild_id: message.guildId,
                cmd_details: args.splice(2).join(' '),
                cmd_counter: 0
            }


            switch (args[0]) {
                case 'add':
                    //check if role is able to create commands
                    if (owner || spacecadets || admin || new_role || test_server_role) {

                        const add_command = await createCommand(body);
                        message.channel.send(`${add_command.msg}`);
                    }
                    break;
                case 'edit':
                    //check if role is able to create commands
                    if (owner || spacecadets || admin || new_role || test_server_role) {

                        const edit_command = await updateCommand(body)
                        message.channel.send(`${edit_command.msg}`);
                    }
                    break;
                case 'del':
                    //check if role is able to create commands
                    if (owner || spacecadets || admin || new_role || test_server_role) {

                        const del_command = await deleteCommand(body)
                        message.channel.send(`${del_command.msg}`);
                    }
                    break;

                default:
                    message.channel.send(`Incorrect format`);
                    break;
            }
        }



    }


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

    }

    if ((message.content.toLowerCase().includes('good morning'))) {
        message.channel.send(`Good morning <@${message.author.id}>`)

    }

    if ((message.content.toLowerCase().includes('ok bye'))) {
        message.channel.send(`https://tenor.com/view/bye-okay-slide-gif-15172486`)

    }

    if ((message.content.toLowerCase().includes('ok hi'))) {
        message.channel.send(`https://tenor.com/view/ok-hi-hi-hello-ok-bye-ok-hi-kid-gif-19799968`)

    }


    if ((message.content) === '!live') {
        message.channel.send('Hey @everyone, Jess is now live on https://www.twitch.tv/spaceyflower21 ! Go check it out!!')
    }


    if ((message.content) === '!map' || (message.content) === '!ranked' || (message.content) === '!mixtape'){

        if (message.channelId == 801881827916513320 || message.channelId == 803352079519318098 || message.channelId == 933130158595002371) {
           if ((message.content) === '!map') {
                const getCurrentMap = async () => {
                    let current_map = await getMap()

                    let timee = humanizeDuration(current_map.br_pubs.current.remainingMins * 60000, { delimiter: " and ", units: ["d", "h", "m"] });
                    let next_timee = humanizeDuration(current_map.br_pubs.next.DurationInMinutes * 60000, { delimiter: " and ", units: ["d", "h", "m"] });

                    message.channel.send(`Current Map: ${current_map.br_pubs.current.map}, ${timee}. 
Next Map: ${current_map.br_pubs.next.map}, ${next_timee}`)
                }
            getCurrentMap()
            }
            if ((message.content) === '!ranked') {
                const getCurrentMap = async () => {
                    let current_map = await getMap()

                    let timee = humanizeDuration(current_map.br_ranked.current.remainingMins * 60000, { delimiter: " and ", units: ["d", "h", "m"] });
                    let next_timee = humanizeDuration(current_map.br_ranked.next.DurationInMinutes * 60000, { delimiter: " and ", units: ["d", "h", "m"] });

                    message.channel.send(`Current Map: ${current_map.br_ranked.current.map}, ${timee}. 
Next Map: ${current_map.br_ranked.next.map}, ${next_timee}`)
                }
            getCurrentMap()
            }
            if ((message.content) === '!mixtape') {
                const getCurrentMap = async () => {
                    let current_map = await getMap()

                    let next_timee = humanizeDuration(current_map.mixtape.next.DurationInMinutes * 60000, { delimiter: " and ", units: ["d", "h", "m"] });
                    
                    message.channel.send(`Current Event: ${current_map.mixtape.current.eventName} on ${current_map.mixtape.current.map}: ${current_map.mixtape.current.remainingTimer}. 
Next Event: ${current_map.mixtape.next.eventName} on ${current_map.mixtape.next.map}, ${next_timee}`)
                }
            getCurrentMap()
            }

            
        }
        //br_ranked.current.remainingMins || br_ranked.next.DurationInMinutes
        //mixtape.current.remainingTimer|| mixtape.next.DurationInMinutes
        //mixtape.current.map && mixtape.current.eventName || mixtape.next.map && mixtape.next.eventName

        else {
            message.channel.send(`This command only works in the gaming channel :unamused:`)
        }
    }

    if (message.content.startsWith('!')) {
        const [CMD_NAME, ...args] = message.content.toLowerCase()
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);

        let body = {
            sent_by: message.author.id,
            cmd_name: CMD_NAME,
            guild_id: message.guildId,
            user: ''

        }


        let conv2 = args[0];
        let new_conv = '1234'
        if (conv2) {
            new_conv = conv2.replace(/[\\<>@#&!]/g, "");
        }
        const receipient = message.guild.members.cache.get(new_conv)

        body.user = receipient;

        switch (CMD_NAME) {
            case 'ban':
                let banMessage = expBan(message, args[0])
                message.channel.send(banMessage)
                break;
            case 'cmd':
                break;
            case 'map':
                break;
            case 'ranked':
                break;
            case 'mixtape':
                break;
            case 'live':
                break;
            case 'rank':
                break;

            default:
                const responsee = await readCommand(body)
                message.channel.send(responsee.msg)
                break;
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
                    liveState = 1

                    var thumbnail;
                    async function getThumbnailUrl(){
                        thumbnail = type.getThumbnailUrl();
                    }
                    getThumbnailUrl();

                    let embeds = { 
                        "content": `@everyone ${type.user_name} is currently live at https://www.twitch.tv/${type.user_login}`,
                    "tts": false,
                    "embeds": [
                      {
                        "type": "rich",
                        "title": `${type.title}`,
                        "description": "",
                        "color": 0x4e00b3,
                        "image": {
                          "url": `${thumbnail}`,
                          "height": 0,
                          "width": 0
                        },
                        "author": {
                            "name": `Twitch `
                          },
                        "url": `https://www.twitch.tv/${type.user_login}`
                      }
                    ]}

               
                    const channel = await client.channels.fetch("792836781049511938");
                    channel.send(embeds);
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

