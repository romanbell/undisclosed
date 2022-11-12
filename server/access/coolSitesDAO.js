let sites
// Collection is similar to table for regular SQL

export default class CoolSitesDAO {
    static async injectDB(conn) {
        if (sites) {
            return
        }
        try {
            sites = await conn.db('undisclosed_db').collection('cool_sites')
        } catch (e) {
            console.error('Unable to establish a collection handle in CoolSitesDAO: error ' + e)
        }
    }


    static async getSitesByTypes(types) {
        // Could add in queries here
        // Could add in page view limiter (i.e. 20 artists per page)
        let cursor

        try {
            // console.log(typeof year)
            cursor = await sites.find({"type" : { "$in": types }})
            const output = await cursor.toArray()
            // console.log(output)
            return output
        }
        catch (e) {
            console.error('Unable to process sites.find({})')
            return ['errorFetchingSites']
        }

    }
}