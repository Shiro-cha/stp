module.exports={

//config.controller
  configure:(options,fs,fileConfig)=>{


    //verify if the file confiuration contain something
   const data =  fs.readFileSync(fileConfig)
    
    const fileContain = JSON.parse(data.toString())
    
    if(typeof fileContain === "object"){
        for(option in options){
            
            fileContain[option] = options[option] || ""
            
        }
        fs.writeFile(fileConfig,JSON.stringify(fileContain),err=>{
            if(err){
                console.log(err.message);
            }else{
                console.log("Set configuration...OK");
            }
        })


    }else{
        console.log("The file configuration is corrupted , please execute \" stp reset\" to restore");
    }

  },


  getConfiguration:(fs,fileConfig)=>{

    const data = fs.readFileSync(fileConfig)
    const fileContain = JSON.parse(data.toString())
    console.log("[All config:]");
    console.log();
    if(typeof fileContain === "object" && Object.values(fileContain).length > 0){
        for(config in fileContain){
        console.log(`       ${config}: ${fileContain[config]}`);
        }
    }else{
        console.log("       There is no configuration yet")
        
    }
    console.log();

  },

  //ask.controller
  askServer:(Client,flags)=>{
    const ssh = new Client()
    //verify flags

    if(!flags.userServer && !flags.addressServer && !flags.passwordServer && !flags.port){
        console.log()
        console.log("[Error: Server]");
        console.log("       Please set configuration using \"set config [options]\" or use flags to this command using \"set ask [options]\" ");
    }else{

        ssh.on("ready",()=>{
            console.log("[Success: Server]");
            ssh.exec("whoami",(err,stream)=>{
                
                stream.on("close",(err)=>{
                    
                    if(err) throw err
                    ssh.end()
                })
                stream.on("data",(data)=>{
                    
                    console.log("   Connected as: "+data.toString());
                })
            })
        })

        ssh.on("error",err=>{
            console.log(err.message || "Unkown error");
        })
        
        ssh.connect({
            user:flags.userServer,
            host:flags.addressServer,
            password:flags.passwordServer,
            port:flags.port
        })
    }


  },

  askGithub:(SimpleGit,flags)=>{
    const git  = new SimpleGit()
    //verify flags

    if(!flags.addressGithub || !flags.userGithub || !flags.passwordGithub ){
        console.log()
        console.log("[Error: Github]");
        console.log("       Please set configuration using \"set config [options]\" or use flags to this command using \"set ask [options]\" ");
    }else{
        console.log("Gooo");
    }
}


}
