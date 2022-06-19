const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config({ path: './.env' });

const Command = require('./models/Command');


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const commands = JSON.parse(fs.readFileSync(`${__dirname}/_data/commands.json`, 'utf-8'));


const importData = async () => {
    try {
        await Command.create(commands);

        console.log('Data Imported...');
        process.exit()
    }
    catch (err) {
        console.error(err);
    }
}


const deleteData = async () => {
    try {
        await Command.deleteMany();

        console.log('Data Destroyed...')
        process.exit()
    }
    catch (err) {
        console.error(err);
    }
}

if (process.argv[2] === '-i') {
    importData()
}
else if (process.argv[2] === '-d') {
    deleteData()
}