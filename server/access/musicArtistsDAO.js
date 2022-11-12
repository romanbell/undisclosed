// import artist from "../../src/services/artists";

let artists
// Collection is similar to table for regular SQL

export default class MusicArtistsDAO {
    static async injectDB(conn) {
        if (artists) {
            return
        }
        try {
            // artists = await conn.db(process.env.MUSIC_ARTISTS_DB).collection("music_artists")
            artists = await conn.db('undisclosed_db').collection('music_artists_dev')
            // artists = await conn.db('sample_restaurants').collection('restaurants')
        } catch (e) {
            console.error('Unable to establish a collection handle in MusicArtistsDAO: error ' + e)
        }
    }


    static async getArtists () {
        // Could add in queries here
        // Could add in page view limiter (i.e. 20 artists per page)
        let cursor

        try {
            cursor = await artists.find()
            const output = await cursor.toArray()
            // console.log(output)
            return output
        }
        catch (e) {
            console.error('Unable to process artists.find({})')
            return ['errorFecthingArtists']
        }

    }
}