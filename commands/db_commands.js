const asyncHandler = require('../middleware/async')
const Command = require('../models/Command')

//@desc     Read command
//@access    anyone
exports.readCommand = asyncHandler(async (command_details) => {
    const { cmd_name, user, sent_by, guild_id } = command_details;

    let publishedCommand = await Command.findOne({ cmd_name });


    if (publishedCommand && ((guild_id == publishedCommand.guild_id) || (guild_id == '803352078620557374') || (guild_id == '933130158595002368'))) {

        if (publishedCommand.cmd_details.includes(`$(count)`)) {

            publishedCommand.cmd_counter += 1;
            await publishedCommand.save();


            publishedCommand.cmd_details = publishedCommand.cmd_details.replace('$(count)', `${publishedCommand.cmd_counter}`)
        }


        if (publishedCommand.cmd_details.includes('$(user)')) {


            if (user) {
                publishedCommand.cmd_details = publishedCommand.cmd_details.replace('$(user)', `${user}`)
            }

            else {
                publishedCommand.cmd_details = publishedCommand.cmd_details.replace('$(user)', `<@${sent_by}>`)
            }
        }


        if (publishedCommand.cmd_details.includes(`$(random)`)) {
            publishedCommand.cmd_details = publishedCommand.cmd_details.replace(`$(random)`, `${Math.floor(Math.random() * 100)}`)
        }



        return { success: true, msg: publishedCommand.cmd_details };
    }


    return { success: false, msg: `Command '${cmd_name}' does not exist` };
})



//@desc     Create new commands to be saved to db
//@access    moderators
exports.createCommand = asyncHandler(async (command_details) => {
    const { created_by, cmd_name, guild_id, cmd_details } = command_details;

    const publishedCommand = await Command.findOne({ cmd_name });

    if (publishedCommand) {
        return { success: false, msg: 'Command already exists' };
    }

    const command = await Command.create(command_details);

    return { success: true, msg: `Command '${cmd_name}' created successfully` };
})




//@desc    Edit existing commands
//@access moderators
exports.updateCommand = asyncHandler(async (command_details) => {
    const { cmd_name, cmd_details } = command_details;

    let publishedCommand = Command.findOne({ cmd_name });

    let update_details = {
        cmd_details
    }

    if (publishedCommand) {
        command = await Command.findOneAndUpdate(cmd_name, update_details, {
            new: true,
            runValidators: true
        });
        return { success: true, msg: `Command '${cmd_name}' updated successfully` };
    }

    return { success: false, msg: `Error encountered whilst trying to update command ${cmd_name}` };

})
//@desc    Delete existing commands
//@access moderators
exports.deleteCommand = asyncHandler(async (command_details) => {
    const { cmd_name } = command_details;

    let command = Command.findOne({ cmd_name });


    if (command) {
        await command.remove()
        return { success: true, msg: `Command '${cmd_name}' deleted successfully` };
    }

    return { success: false, msg: `Error encountered whilst trying to delete command ${cmd_name}` };

})