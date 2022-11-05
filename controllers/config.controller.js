const bzr = require("../bazar.function")
const fs = require("fs")
const {join} = require("path")
const {userInfo} = require("os")
const fileConfig = join(userInfo().homedir,".stp_rc")

module.exports={
  //set configuration
  setConfiguration: options=>{
    //verify if the file configuration exist
    fs.stat(fileConfig,(err,stats)=>{
      //verify if an error occure
      if(err){
        //error linked in file doesn't exist

        if(err.errno===-2 && err.code==="ENOENT" && err.path === fileConfig){
          //create the file because it doesn't exist
          fs.append(fileConfig,"{}",err=>{
            if(err){
              console.log(err.message)
            }else{
              //next step pass to the configuration function
              
            }
          })
        }
      }else{
        console.log(stats)
      }
    })

  },
  resetConfiguration:options=>{
    console.log(options)
  }
}
