const {cwd} = require("process")
const path = require("path")
const fs = require("fs")
const {userInfo} = require("os")
const url = require("url")
const {Client} = require("ssh2")
const SimpleGit = require("simple-git")
const fileConfig = path.join(userInfo().homedir,".stp_rc")



module.exports = {
  sendPushPull:(dir,option)=>{
    let reposPath = dir || cwd()
    const fileContain = JSON.parse(fs.readFileSync(fileConfig).toString())
    const messageString = option.message || fileContain.defautMessage || "Message by stp"
    const branch = option.branch || fileContain.branch

    if(!path.isAbsolute(reposPath)){
      reposPath=path.join(cwd(),reposPath)
    }

    const git = new SimpleGit(reposPath)
    console.log("Add and commit on: "+reposPath);
    try{

      git.add(".").then(function(){
        git.commit(`${messageString}`,function(err){
          console.log("commit: finish...OK");
          console.log("Pull from reposistory");
          if(fileContain.addressGithub && fileContain.userGithub && fileContain.passwordGithub){
            const urlObject = url.parse(fileContain.addressGithub)
            console.log(urlObject);
            const remote=`${urlObject.protocol}://${fileContain.userGithub}:${fileContain.passwordGithub}@${urlObject.hostname}`

          }else{
            console.log("       Please set configuration using \"set config [options]\"");
            console.log("addressGithub [*]");
            console.log("userGithub [*]");
            console.log("passwordGithub [*]");
          }

        })
      })


    }catch(err){
      console.log(err.message);
    }
  }

}
