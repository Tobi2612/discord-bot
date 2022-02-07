exports.expBan = (message, toBan) => {

    let conv2 = toBan
    let new_conv = conv2.replace(/[\\<>@#&!]/g, "");

    if (new_conv == '932996374562238474') {
        return (`Ban who??? :rofl: :rofl:`)
    }

    const ban_member = message.guild.members.cache.get(new_conv)

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
    if (ban_member) {
        min = Math.ceil(0);
        max = Math.floor((banMessage.length) - 1);
        let banRandom = Math.floor(Math.random() * (max - min + 1)) + min;
        return (`${ban_member} ${banMessage[banRandom]}`)
    }

    else {
        return (`Ban who??? :neutral_face:`)
    }
}

exports.expDown = (message, down) => {
    let conv2 = down
    let new_conv = '1234'
    console.log(conv2)
    if (conv2) {
        new_conv = conv2.replace(/[\\<>@#&!]/g, "");
    }


    const down_member = message.guild.members.cache.get(message.author.id)
    const down_receipient = message.guild.members.cache.get(new_conv)

    if (down === 0) {
        return (`${down_member} is ${Math.floor(Math.random() * 100)}% down bad`)
    }

    if (down_receipient) {
        return (`${down_receipient} is ${Math.floor(Math.random() * 100)}% down bad`)

    }

    else {
        return (`${down_member} is ${Math.floor(Math.random() * 100)}% down bad`)
    }
}

exports.expPetty = (message, petty) => {
    let conv2 = petty
    let new_conv = '123'
    if (conv2) {
        new_conv = conv2.replace(/[\\<>@#&!]/g, "");
    }


    const petty_member = message.guild.members.cache.get(message.author.id)
    const petty_receipient = message.guild.members.cache.get(new_conv)

    if (conv2 === 0) {
        return (`${petty_member} is being ${Math.floor(Math.random() * 100)}% petty`)
    }

    if (petty_receipient) {
        return (`${petty_receipient} is being ${Math.floor(Math.random() * 100)}% petty`)

    }

    else {
        return (`${petty_member} is being ${Math.floor(Math.random() * 100)}% petty`)
    }
}

exports.expToxic = (message, toxic) => {
    let conv2 = toxic
    let new_conv = '123'
    if (conv2) {
        new_conv = conv2.replace(/[\\<>@#&!]/g, "");
    }


    const toxic_member = message.guild.members.cache.get(message.author.id)
    const toxic_receipient = message.guild.members.cache.get(new_conv)

    if (conv2 === 0) {
        return (`${toxic_member} is being ${Math.floor(Math.random() * 100)}% toxic`)
    }

    if (toxic_receipient) {
        return (`${toxic_receipient} is being ${Math.floor(Math.random() * 100)}% toxic`)

    }

    else {
        return (`${toxic_member} is being ${Math.floor(Math.random() * 100)}% toxic`)
    }
}