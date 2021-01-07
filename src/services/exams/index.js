const express = require("express")
const {join} = require("path")
const {getExams,writeExams,getQuestions} = require("../../fsUtilities")
const { check, validationResult ,matchedData} = require("express-validator")
const uniqid = require("uniqid")


const examsRouter = express.Router()


examsRouter.post("/start",[check("candidateName")
.exists()
.withMessage("Add a name!"),
check("name")
  .exists()
  .withMessage("Add a name!")
],async(req,res,next)=>{
    try {
        const errors = validationResult(req)
        const questions = await getQuestions()
        const exams = await getExams()
       

        let check = false
        let randomExam = []
        let randomQuestion = questions[Math.floor(Math.random()*questions.length)]
        randomExam.push(randomQuestion)
        

        for(let i = 0; randomExam.length<5;i++){
            let nextRandomQuestion = questions[Math.floor(Math.random()*questions.length)]
            
            
            if(!(randomExam.includes(nextRandomQuestion))){
                console.log(nextRandomQuestion,"sdad1231231231231231231231232")
                randomExam.push(nextRandomQuestion)
            }
           
           
        }
        // for(let i = 0; randomExam.length<5;i++){

        //     let nextRandomQuestion = questions[Math.floor(Math.random()*questions.length)]
        //     for(let y= 0 ; y<randomExam.length;y++){
        //         if(randomExam[y] ===nextRandomQuestion){
        //             check = true;
        //         }
        //               }   
        //         if(!(check)){
        //             randomExam.push(nextRandomQuestion)
        //         }
        //     }
        

        
      
        if(!errors.isEmpty()){
            const err = new Error()
            err.message = errors
            err.httpStatusCode = 400
            next(err)
        }else{
            const newExam = {
                ...req.body,
                _id:uniqid(),
                examDate:Date(),
                question:randomExam,
                isCompleted:false,
            }
            exams.push(newExam)
            await writeExams(exams)
            res.send(newExam)
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
})

examsRouter.post("/:id/:answer",async(req,res,next)=>{
    try {
        const errors = validationResult(req)
        const exams = await getExams()
        const myExam = exams.find(exam =>exam._id === req.params.id)


        
        if(!errors.isEmpty()){
            const err = new Error()
            err.message = errors
            err.httpStatusCode = 400
            next(err)
        }else{
          
            if(myExam.hasOwnProperty('questionIndex')){
                if(myExam.questionIndex===4){
                   myExam.isCompleted = true
                }else{
                    myExam.questionIndex +=1
                    let myquestion = myExam.question[myExam.questionIndex]
                    let myAnswer = myquestion.answers[req.params.answer]
                    if(myAnswer.isCorrect){
                        myExam.score +=1
                       
                    }else{
                        myExam.score+=0
                       
                    }
                }
               

                

            
               
            }else{
                myExam.questionIndex = 0
                let firstquestion = myExam.question[myExam.questionIndex]
                console.log("addasdasdasda",firstquestion)
                let myAnswer = firstquestion.answers[req.params.answer] 
                console.log(myAnswer.isCorrect,"asdasd====123")

               
                if(myAnswer.isCorrect){
                    myExam.score =1
                 
                   
                }else{
                    myExam.score = 0
                    
                }
                
            }
        }
        await writeExams(exams)
    } catch (error) {
        console.log(error)
        next(error)
    }
})
examsRouter.get("/:id", async (req, res, next) => {
    try {
      const exams = await getExams();
      const exam = exams.find((ex) => ex._id === req.params.id);
      if (exam) {
        res.status(200).send(exam);
      } else {
        const err = new Error();
        err.message = "Exam id not found";
        err.httpStatusCode = 404;
        next(err);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

module.exports = examsRouter

