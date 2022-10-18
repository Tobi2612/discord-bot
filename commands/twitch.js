const dotenv = require('dotenv');
const axios = require('axios');
const TwitchApi = require("node-twitch").default;

//load env vars
dotenv.config({ path: './.env' })



const twitch = new TwitchApi({
    client_id: process.env.TWITCH_CLIENT_ID,
    client_secret: process.env.TWITCH_CLIENT_SECRET
});





exports.expCheckLive = async (check_user) => {
    liveee = await goLive2(check_user)
    var thumbnail;

    async function getThumbnailUrl(){
        const stream = liveee.data[0];
        thumbnail = stream.getThumbnailUrl();
    }
    
    getThumbnailUrl();

    if (liveee) {
        let embeds = { 
            "content": `${liveee.data[0].user_name} is currently live at https://www.twitch.tv/${liveee.data[0].user_login}`,
        "tts": false,
        "embeds": [
          {
            "type": "rich",
            "title": `${liveee.data[0].title}`,
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
            "url": `https://www.twitch.tv/${liveee.data[0].user_login}`
          }
        ]}
          return embeds;
        // return (`${liveee.data[0].user_name} is currently live at https://www.twitch.tv/${liveee.data[0].user_login} ${thumbnail}`)

    }

    else {
        return (`${args[0]} is not live!`)
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