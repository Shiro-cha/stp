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

          if(fileContain.addressGithub && fileContain.userGithub && fileContain.passwordGithub && branch){
            const urlObject = url.parse(fileContain.addressGithub)
            console.log("Pull from reposistory: "+fileContain.addressGithub);
            const remote=`${urlObject.protocol}//${fileContain.userGithub}:${fileContain.passwordGithub}@${urlObject.hostname}${urlObject.pathname}`
            console.log(remote);
            git.pull(remote,branch,function(err,log){
              if(err){
                console.log(err.message || "Unkown error");
              }else{
                //push on this remote
                console.log("Pull...OK");
                console.log("Push to reposistory: "+fileContain.addressGithub);
                git.push(remote,branch,function(err,log){
                  if(err){
                    console.log(err.message || "Unkown error");
                  }else{
                    console.log("Push...OK");
                    console.log();
                    console.log("Pulling from the vps server ");
                    if(fileContain.addressServer && fileContain.passwordServer && fileContain.userServer){
                      const ssh = new Client()
                      const arrayPath=urlObject.pathname.split("/")
                      const arrayPathNoDot = arrayPath[arrayPath.length-1] || "."

                      const targetPath = option.target || arrayPathNoDot.split(".")[0]

                      ssh.on("ready",()=>{
                          console.log("[Success: Server]");
                          console.log();
                          ssh.exec(`cd ${targetPath} && git pull ${remote} ${branch}`,(err,stream)=>{

                              stream.on("close",err=>{

                                  if(err) throw err
                                  ssh.end()
                              })
                              stream.on("data",data=>{

                                  console.log(data.toString());
                              })
                          })
                      })
 
                      ssh.on("error",err=>{
                          console.log(err.message || "Unkown error");
                      })

                      ssh.connect({
                          user:fileContain.userServer,
                          host:fileContain.addressServer,
                          password:fileContain.passwordServer,
                          port:fileContain.port || 22
                      })
                    }
                  }
                })
              }
            })
          }else{
            console.log("       Please set configuration using \"set config [options]\"");
            console.log("       address-github [*]");
            console.log("       user-github [*]");
            console.log("       password-github [*]");
            console.log("       branch [*]");
          }

        })
      })


    }catch(err){
      console.log(err.message);
    }
  }

}
