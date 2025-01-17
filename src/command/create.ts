import { select, input } from '@inquirer/prompts';
import {clone} from '../utils/clone'
import path from "path"
import fs from "fs-extra"
export interface TemplateInfo {
    name: string; // 项目名称
    downloadUrl: string; // 下载地址
    description: string; // 项目描述
    branch: string; // 项目分支
} 

// 这里保存了我写好了咱们的之前开发的模板
export const templates: Map<string, TemplateInfo> = new Map(
    [
      ["Vite4-Vue3-Typescript-template", {
        name: "admin-template",
        downloadUrl: 'https://gitee.com/Xinkakaka/practical-training-one.git',
        description: 'Vue3技术栈开发模板',
        branch: 'dev'
      }],
        ["Vite4-Vue3-Typescript-template", {
            name: "admin-template",
            downloadUrl: 'https://gitee.com/Xinkakaka/practical-training-one.git',
            description: 'Vue3技术栈开发模板',
            branch: 'dev1'
        }]
    ]
  )
 

//文件覆盖
export function isOvewrite(fileName:string){
    console.warn(`${fileName} 文件夹存在`);
    return select({
        message:"是否覆盖",
        choices:[
            {name:"覆盖",value:true},
            {name:"取消",value:false}
        ]
    })
}

export async function create(prjName?: string) {
    //初始化模版列表
    const templateList=Array.from(templates).map((item:[string,TemplateInfo])=>{
        const [name,info]=item
        return {
            name,
            value:name,
            description:info.description
        }

    });
    if(!prjName){
        prjName=await input({ message: '请输入项目名称' })
    }
    // 检查文件夹是否存在
    // 如果文件夹存在，则提示是否覆盖
    const filePath = path.resolve(process.cwd(),prjName)
    if(fs.existsSync(filePath)){
        const run = await isOvewrite(prjName)
        if(run){
            await fs.remove(filePath)
        }else{
            return //不覆盖直接结束
        }
    }
    // 选择模版
    const templateName = await select({ message: '请选择模版', choices: templateList })
    const info = templates.get(templateName)
    console.log(info)

    console.log('create',prjName)
    if(info){
        clone(info.downloadUrl,prjName,['-b',info.branch])
    }
}











//   export default async function create(prjName?: string) {
//     // ...
  
//     // 我们需要将我们的 map 处理成 @inquirer/prompts select 需要的形式
//     // 大家也可以封装成一个方法去处理
//     const templateList = [...templates.entries()].map((item: [string, TemplateInfo]) => {
//       const [name, info] = item;
//       return {
//         name,
//         value: name,
//         description: info.description
//       }
//     })
  
//     // 选择模板
//     const templateName = await select({
//       message: '请选择需要初始化的模板:',
//       choices: templateList,
//     });
  
//     // 下载模板
//     const gitRepoInfo = templates.get(templateName)
//     if (gitRepoInfo) {
//       await clone(gitRepoInfo.downloadUrl , prjName, ['-b', `${gitRepoInfo.branch}`])
//     } else {
//       log.error(`${templateName} 模板不存在`)
//     }
//   }
