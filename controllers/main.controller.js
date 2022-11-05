const {cwd} = require("process")
const path = require("path")
const {Client} = require("ssh2")
const SimpleGit = require("simple-git")


module.exports = {
  sendPushPull:(dir,option)=>{
    let reposPath = dir || cwd()
    console.log();
    const messageString = option.message || "Message by stp"
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
