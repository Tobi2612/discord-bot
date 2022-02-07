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

    if (liveee) {
        return (`${liveee.data[0].user_name} is currently live at https://www.twitch.tv/${liveee.data[0].user_login} `)
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