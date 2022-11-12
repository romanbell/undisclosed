let message
// Collection is similar to table for regular SQL

export default class MessageSubmissionDAO {
    static async injectDB(conn) {
        if (message) {
            return
        }
        try {
            message = await conn.db('undisclosed_db').collection('contact_messages')
        } catch (e) {
            console.error('Unable to establish a collection handle in MessageSubmissionDAO: error ' + e)
        }
    }


    static async pushMessageToDB (req) {
        // Could add in queries here
        // Could add in page view limiter (i.e. 20 artists per page)
        let cursor

        try {
            // cursor = await message.insertOne({"message": req.body})
            cursor = await message.insertOne(req.body)
            // console.log(req)
            // console.log('req.--------------------------------')
            // console.log(req.body)
            return ['messagePushedSuccessfully']
        }
        catch (e) {
            console.error('Unable to process message.insertOne({})')
            return ['errorPushingMessage']
        }

    }
}