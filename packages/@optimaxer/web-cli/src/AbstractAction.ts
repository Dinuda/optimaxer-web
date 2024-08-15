import chalk from "chalk";
import { Command } from "commander";

export abstract class AbstractAction {  
    program = new Command();
    version:string = '1.1.1';
    log = console.log;

    constructor() {
        this.log(chalk.blueBright(
`
████████████████████████████████████████████████████
██████████                                ██████████
██████████  Optimaxer CLI: Version ${this.version}  ██████████
██████████                                ██████████
████████████████████████████████████████████████████
`
        ));

    }

    abstract run(options:any): Promise<void>;
}