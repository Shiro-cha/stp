const {cwd} = require("process")
const path = require("path")
const {Client} = require("ssh2")
const SimpleGit = require("simple-git")


module.exports = {
  sendPushPull:(dir,message)=>{
    let reposPath = dir || cwd()
    const messageString = message
    if(!path.isAbsolute(reposPath)){
      reposPath=path.join(cwd(),reposPath)
    }

    const git = new SimpleGit(reposPath)
    console.log(reposPath);
    try{

      git.add(".").then(function(){
        git.commit(`${messageString}`,function(err){
          console.log("finish");
        })
      })


    }catch(err){
      console.log(err.message);
    }
  }

}
