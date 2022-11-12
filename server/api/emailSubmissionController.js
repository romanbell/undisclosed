import express from "express"
import EmailSubmissionDAO from "../access/emailSubmissionDAO.js"

export default class EmailSubmissionController {
    static async apiPushEmail(req, res, next) {
        // console.log(req.body)
        const emailSubmission = await EmailSubmissionDAO.pushEmailToDB(
            // emailAddress
            req
        )

        let response = {
            email: emailSubmission,
            // entries_per_page: 20
        }
        res.send(response)
    }

}


