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

  }


}
