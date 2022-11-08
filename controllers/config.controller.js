const {configure , getConfiguration} = require("../bazar.function") 
const fs = require("fs")
const {join} = require("path")
const {userInfo} = require("os")
const fileConfig = join(userInfo().homedir,".stp_rc")

module.exports={
  //set configuration
  setConfiguration: options=>{
    //verify if the file configuration exist
    fs.stat(fileConfig,(err)=>{
      //verify if an error occure
      if(err){
        //error linked in file doesn't exist

        if(err.errno===-2 && err.code==="ENOENT" && err.path === fileConfig){
          //create the file because it doesn't exist
          fs.appendFile(fileConfig,JSON.stringify({}),function(err){
            if(err){
              console.log(err.message)
            }else{
              //next step pass to the configuration function
            
              if(Object.values(options).length > 0){
                configure(options,fs,fileConfig)
              }else{
                getConfiguration(fs,fileConfig)
              }
              
            }
          })
        }else{
          //for all other error
          console.log("Unkown error");
        }
      }else{
        if(Object.values(options).length > 0){
          configure(options,fs,fileConfig)
        }else{
          getConfiguration(fs,fileConfig)
        }
      }
    })

  },
  resetConfiguration:options=>{
    //verify if the file configuration exist
    fs.stat(fileConfig,(err)=>{
      //verify if an error occure
      if(err){
        //error linked in file doesn't exist

        if(err.errno===-2 && err.code==="ENOENT" && err.path === fileConfig){
          //create the file because it doesn't exist
          fs.appendFile(fileConfig,JSON.stringify({}),function(err){
            if(err){
              console.log(err.message)
            }else{
              //next step pass to the configuration function
            
              console.log("Reset configuration...OK");
            }
          })
        }else{
          //for all other error
          console.log("Unkown error");
        }
      }else{
        fs.writeFile(fileConfig,JSON.stringify({}),err=>{
          if(err){
            console.log(err.message)
          }else{
            console.log("Reset configuration...OK");
          }
        })
      }
    })
  }
}
