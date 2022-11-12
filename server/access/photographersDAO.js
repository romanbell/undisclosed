let photographers
// Collection is similar to table for regular SQL

export default class PhotographersDAO {
    static async injectDB(conn) {
        if (photographers) {
            return
        }
        try {
            // photographers = await conn.db('undisclosed_db').collection('photographers')
            photographers = await conn.db('undisclosed_db').collection('visual_artists')
        } catch (e) {
            console.error('Unable to establish a collection handle in PhotographersDAO: error ' + e)
        }
    }


    static async getPhotographers () {
        // Could add in queries here
        // Could add in page view limiter (i.e. 20 photographers per page)
        let cursor

        try {
            cursor = await photographers.find()
            const output = await cursor.toArray()
            // console.log(output)
            return output
        }
        catch (e) {
            console.error('Unable to process photographers.find({})')
            return ['errorFecthingPhotographers']
        }

    }
}