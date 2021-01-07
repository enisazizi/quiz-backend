const {readJSON,writeJSON} =require("fs-extra")
const {join} = require("path")

const questionPath = join(__dirname,"./services/exams/questsion.json")
const examsPath = join(__dirname,"./services/exams/exams.json")
const readDB = async filePath =>{
    try {
        const fileJson = await readJSON(filePath)
        return fileJson
    } catch (error) {
        throw new Error(error)
    }
}

const writeDB = async (filePath,fileContent) =>{
    try {
        const fileJson = await writeJSON(filePath,fileContent)
        return fileJson
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    getQuestions : async ()=> readDB(questionPath),
    getExams : async ()=> readDB(examsPath),
    writeExams : async examsData =>writeDB(examsPath,examsData),
    writeQuestions : async questionsData => writeDB(questionPath,questionsData)
}