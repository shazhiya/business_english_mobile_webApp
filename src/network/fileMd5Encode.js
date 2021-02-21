import md5 from 'js-md5'

export default function(file){
    let fileReader = new FileReader()
    fileReader.readAsBinaryString(file)
    return new Promise(function(resolve, reject){
        try {
            fileReader.onload=()=>{
                resolve(fileReader.result)
            }
        }catch (err){
            reject(err)
        }
    }).then(data=>{
        return md5(data)
    })
}