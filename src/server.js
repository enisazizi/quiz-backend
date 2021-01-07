const express = require("express")
const cors = require("cors")
const listEndpoints = require("express-list-endpoints")


const examsRouter = require("./services/exams")
const questionsRouter = require("./services/questions")
const {
    notFoundErrorHandler,
    unauthorizedErrorHandler,
    forbiddenErrorHandler,
    badRequestErrorHandler,
    catchAllErrorHandler,
  } = require("./errorHandlers")

const server = express()
const port = process.env.PORT || 3001
server.use(express.json())

server.use(cors())

server.use("/exams",examsRouter)
server.use("/questions",questionsRouter)

server.use(notFoundErrorHandler)
server.use(unauthorizedErrorHandler)
server.use(forbiddenErrorHandler)
server.use(badRequestErrorHandler)
server.use(catchAllErrorHandler)

console.log(listEndpoints(server))



server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})