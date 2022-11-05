const {askServer} = require("../bazar.function")
const {join} = require("path")
const {userInfo} = require("os")
const fileConfig = join(userInfo().homedir,".stp_rc")
const fs = require("fs")
const {Client} = require("ssh2")

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
            }



        }
        askServer(Client,flags.server)
      })


    }


}
