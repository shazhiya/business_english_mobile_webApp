let mysql = require('mysql')
let path = require("path");
let fs = require("fs");

function getFiles(dirPath) {
    return fs.readdirSync(dirPath)
}

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'business_english',
})

let resultProcessor = (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.log(res)
    }
}

/* // course
!function addCurriculum() {
    let dir = 'E:\\files\\courseCover'
    let insert = 'insert into curriculum(curriculum_cover,curriculum_description,curriculum_name) value(?,?,?)'
    connection.connect()
    getFiles(dir).forEach((fileName, index) => {
        connection.query(insert, ["courseCover\\" + fileName, "this is a curriculum for business English online!", "course_" + index], (err, res) => {
            if (err) {
                console.log(err)
            } else {
                console.log(res)
            }
        })
    })
    connection.end()
}();
*/

// user
!function addUser(){
    connection.connect()
    let headIconPath = 'E:\\files\\headIco'
    let insert = 'insert into user (user_name,password,user_headico) value (?,?,?)'
    getFiles(headIconPath).forEach((fileName,index)=>{
        connection.query(insert,[`shazhi_${index}`,'123456','headIco/'+fileName],resultProcessor)
    })
    connection.end()
}();

// assign role



