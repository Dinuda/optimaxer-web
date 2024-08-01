import chalk from "chalk";
import { Command } from "commander";

export abstract class AbstractAction {  
    program = new Command();
    version:string = '1.0.7';
    log = console.log;

    constructor() {
        this.log(chalk.blueBright(`
            ===| Optimaxer CLI |===
                ${this.version}
        `));
    }

    abstract run(options:any): Promise<void>;
}