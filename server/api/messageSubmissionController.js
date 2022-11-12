import express from "express"
import MessageSubmissionDAO from "../access/messageSubmissionDAO.js"

export default class MessagesSubmissionController {
    static async apiPushMessage(req, res, next) {
        // console.log(req.body)
        const messageSubmission = await MessageSubmissionDAO.pushMessageToDB(
            // conact message
            req
        )

        let response = {
            message: messageSubmission,
            // entries_per_page: 20
        }
        res.send(response)
    }

}


