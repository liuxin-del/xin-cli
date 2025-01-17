// import simpleGit,{SimpleGitOptions} from 'simple-git@3.21.0'
// const gitOptions:Partial<SimpleGitOptions> = {
//     baseDir: process.cwd(),
//     binary: 'git',
//     maxConcurrentProcesses: 6,
    
// }
// export const clone=(url:string,prjName:string,options:string[])=>{
//     const git = simpleGit(gitOptions)
//     try{

//     }
// }




import simpleGit, {SimpleGitOptions} from 'simple-git';
import createLogger from "progress-estimator";
import chalk from "chalk";
import path from "path"
import fs from "fs-extra"

const logger = createLogger({ // 初始化进度条
  spinner: {
    interval: 300, // 变换时间 ms
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(item=>chalk.blue(item)) // 设置加载动画
  }
})

const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(), // 根目录
  binary: 'git',
  maxConcurrentProcesses: 6, // 最大并发进程数
};

export const clone = async (url: string, prjName: string, options: string[]) => {
  const git = simpleGit(gitOptions)
  try {
    // 开始下载代码并展示预估时间进度条
    await logger(git.clone(url, prjName, options), '代码下载中: ', {
      estimate: 8000 // 展示预估时间
    })

    // 下面就是一些相关的提示
    console.log()
    console.log(chalk.green('代码下载完成！'))
    console.log(chalk.green(`==================================`))
    console.log(chalk.green(`=== 欢迎使用 liuxin-cli 脚手架5 ===`))
    console.log(chalk.green(`==================================`))
    console.log()
    console.log()
    console.log(chalk.green(`=======请使用 npm install 安装依赖=======`))
    console.log(chalk.green(`=======请使用 npm run dev=======`))

   
  } catch (error) {
    console.log(chalk.red('代码下载失败！'))
    console.log(error)
  }
}