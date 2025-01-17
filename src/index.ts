// export function add (a:number,b:number){
//     return a+b;
// }
import { Command } from 'commander';
import { version } from '../package.json';
import {create} from './command/create';
const program = new Command('dawei');//创建命令行工具
program.version(version,'-v, --version');//设置版本号

program
  .command('create')
  .description('创建一个新项目')
  .argument('[name]', '项目名称')
  .action(async (name) => {
    create(name);
    // if(name) console.log(`create ${name}`)
    // else console.log(`create command`)
    // console.log(`create ${name}`)
  });

program.parse();//解析命令行参数