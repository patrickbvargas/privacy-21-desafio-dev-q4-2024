import express from "express"
import cors from "cors"
import { listBookLoans } from "./endpoints/listBookLoans"

const API_PORT = 8080

const api = express()

api.use(cors({
    origin: "*",
}))

api.get("/", (request, response) => {
    response.send("API is up")
})
api.get("/book-loans", listBookLoans)

api.listen(API_PORT, "0.0.0.0", () => {
    console.log(`API running on port ${API_PORT}`)
})