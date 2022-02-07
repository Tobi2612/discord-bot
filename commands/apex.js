const dotenv = require('dotenv');
const axios = require('axios');
const { Client, Intents, Message } = require('discord.js');


let liveState = 0
//load env vars
dotenv.config({ path: './.env' })

const PREFIX = '$';
