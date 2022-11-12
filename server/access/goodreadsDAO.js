let books
// Collection is similar to table for regular SQL

export default class GoodreadsDAO {
    static async injectDB(conn) {
        if (books) {
            return
        }
        try {
            books = await conn.db('undisclosed_db').collection('goodreads')
        } catch (e) {
            console.error('Unable to establish a collection handle in GoodreadsDAO: error ' + e)
        }
    }


    static async getBooks () {
        // Could add in queries here
        // Could add in page view limiter (i.e. 20 artists per page)
        let cursor

        try {
            cursor = await books.find()
            const output = await cursor.toArray()
            // console.log(output)
            return output
        }
        catch (e) {
            console.error('Unable to process books.find({})')
            return ['errorFecthingBooks']
        }

    }
}