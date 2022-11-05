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
          console.log(url.parse(fileContain.addressGithub));
        })
      })


    }catch(err){
      console.log(err.message);
    }
  }

}
