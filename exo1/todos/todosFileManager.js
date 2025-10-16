import { fs} from 'fs'

export async function writeInFile(todoJson){
    new Promise((resolve, reject)=>{
        if(!fs.exists('../todos.json')){
            
        }
    })

    fs.writeFile('../todos.json', )
    
}