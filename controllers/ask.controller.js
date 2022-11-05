const {askGithub,askServer} = require("../bazar.function")
const {join} = require("path")
const {userInfo} = require("os")
const fileConfig = join(userInfo().homedir,".stp_rc")
const fs = require("fs")
const {Client} = require("ssh2")
const SimpleGit = require("simple-git")

module.exports = {

    checking:options=>{

        //verify if the file configuration exist
    fs.stat(fileConfig,(err)=>{
        const data = fs.readFileSync(fileConfig)
        const fileContain = JSON.parse(data.toString())
        const flags = {
            server: {
                to:options["server"],
                userServer: options["userServer"] || fileContain["userServer"] || "",
                addressServer: options["addressServer"] || fileContain["addressServer"] || "",
                passwordServer: options["passwordServer"] || fileContain["passwordServer"] || "",
                port: options["port"] || fileContain["port"] || 22,
            },
            github: {
                to:options["github"],
                addressGithub: options["addressGithub"] || fileContain["addressGithub"] || "",
                userGithub: options["userGithub"] || fileContain["userGithub"] || "",
                passwordGithub: options["passwordGithub"] || fileContain["passwordGithub"] || "",
            },
            
            

        }
        if(flags.server.to && flags.github.to){
            askServer(Client,flags.server)
            askGithub(SimpleGit,flags.github)
        }else if(flags.server.to){
            askServer(Client,flags.server)
        }else if(flags.github.to){
            
            askGithub(SimpleGit,flags.github)
        }else{
            askServer(Client,flags.server)
            askGithub(SimpleGit,flags.github)
        }
      })


    }


}