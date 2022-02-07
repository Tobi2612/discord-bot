const dotenv = require('dotenv');
const axios = require('axios');



let liveState = 0
//load env vars
dotenv.config({ path: './.env' })

const PREFIX = '$';

exports.expJoke = async () => {
    let jokes = await getJokes('joke')

    if (jokes.error == true) {
        return (`I don't have a joke for you at the moment, try again in a minute! \n My bad :neutral_face:`)
    }
    if (jokes.type == 'single') {
        return (`${jokes.joke}`)
    }

    if (jokes.type == 'twopart') {
        return (`${jokes.setup} \n\n\n ${jokes.delivery}`)
    }
}

exports.expDadJoke = async () => {
    let jokes = await getJokes('dadjoke')

    if (jokes) {
        if (jokes.status == 200) {
            return (`${jokes.joke}`)
        }
    }

    else {
        return (`I don't have a joke for you at the moment, try again in a minute! \n My bad :neutral_face:`)
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
