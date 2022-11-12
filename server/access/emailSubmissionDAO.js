let email
// Collection is similar to table for regular SQL

export default class EmailSubmissionDAO {
    static async injectDB(conn) {
        if (email) {
            return
        }
        try {
            email = await conn.db('undisclosed_db').collection('email_submissions')
        } catch (e) {
            console.error('Unable to establish a collection handle in EmailSubmissionDAO: error ' + e)
        }
    }


    static async pushEmailToDB (req) {
        // Could add in queries here
        // Could add in page view limiter (i.e. 20 artists per page)
        let cursor

        try {
            cursor = await email.insertOne(req.body)
            // console.log(req)
            // console.log('req.--------------------------------')
            // console.log(req.body)
            return ['emailPushedSuccessfully']
        }
        catch (e) {
            console.error('Unable to process email.insertOne({})')
            return ['errorPushingEmail']
        }

    }
}