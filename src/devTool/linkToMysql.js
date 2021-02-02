let mysql = require('mysql')
let path = require("path");
let fs = require("fs");

function getFiles(dirPath){
    return fs.readdirSync(dirPath)
}

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'business_english',
})

!function addCurriculum(){
    let dir = 'E:\\files\\courseCover'
    let insert = 'insert into curriculum(curriculum_cover,curriculum_description,curriculum_name) value(?,?,?)'
    connection.connect()
    getFiles(dir).forEach((fileName,index)=>{
        connection.query(insert,["courseCover\\"+fileName,"this is a curriculum for business English online!","course_"+index],(err,res)=>{
            if (err){
                console.log(err)
            }else{
                console.log(res)
            }
        })
    })
    connection.end()
}();




