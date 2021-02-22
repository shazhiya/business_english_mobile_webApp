import uploadFile from "@/network/uploadFile";
const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
const chunkSize = 2*1024*1024
export default function(file,options,fragmentCallback){
    let totalSlice = Math.ceil(file.size / chunkSize)
    let currentSlice = 0;
    let promiseList = []
    for (;currentSlice<totalSlice; currentSlice++){
        let currentFile = new File([blobSlice.call(file,chunkSize * currentSlice,chunkSize*(currentSlice+1))],file.name+`.part.${currentSlice}`,{type:'slice'})
        promiseList.push(uploadFile(currentFile,'cover',options).then(res=>{
            fragmentCallback({chunkSize:currentFile.size})
            return res
        }).catch(()=>{
            currentSlice = totalSlice
        }))
    }
    return Promise.all(promiseList)
}