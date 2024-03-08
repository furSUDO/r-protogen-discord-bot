import * as appCommands from './applicationCommands';
import { BaseCommand } from './applicationCommands/base';

export const applicationCommands: Array<BaseCommand> = [
    new appCommands.Ping(),
    new appCommands.Embed(),
    new appCommands.Close(),

    new appCommands.MessageReport(),
    new appCommands.UserReport(),
]