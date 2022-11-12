let tracks
// Collection is similar to table for regular SQL

export default class WerappedDAO {
    static async injectDB(conn) {
        if (tracks) {
            return
        }
        try {
            tracks = await conn.db('undisclosed_db').collection('wrapped')
        } catch (e) {
            console.error('Unable to establish a collection handle in WrappedDAO: error ' + e)
        }
    }


    static async getTopTracksByYear (year) {
        // Could add in queries here
        // Could add in page view limiter (i.e. 20 artists per page)
        let cursor

        try {
            // console.log(typeof year)
            cursor = await tracks.find({"year" : { "$in": [year] }})
            const output = await cursor.toArray()
            // console.log(output)
            return output
        }
        catch (e) {
            console.error('Unable to process tracks.find({})')
            return ['errorFetchingTracks']
        }

    }
}