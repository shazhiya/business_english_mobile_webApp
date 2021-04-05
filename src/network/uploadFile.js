import back from "./index"

function upload(file, type, options) {
    let param = new FormData()
    param.append('file', file)
    if (options){
        Object.keys(options).forEach(key=>{
            param.append(key,options[key])
        })
    }
    let config = {
        headers: {'Content-Type': 'multipart/form-data'}
    }
    return back.post(`file/${type}/upload`, param, config)
}

export default upload