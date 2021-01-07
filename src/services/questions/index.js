const express = require("express")
const {join} = require("path")
const {getExams,writeExams,getQuestions,writeQuestions} = require("../../fsUtilities")
const { check, validationResult ,matchedData} = require("express-validator")
const uniqid = require("uniqid")

const questionsRouter = express.Router()


questionsRouter.get("/",async(req,res,next)=>{
    try {
        
    } catch (error) {
        
    }
})

module.exports = questionsRouter