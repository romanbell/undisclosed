import express from "express"
import CoolSitesDAO from "../access/coolSitesDAO.js"
import url from "url"

export default class CoolSitesController {
    static async apiGetSites(req, res, next) {
        // http://localhost:5000/api/v1/coolsites?types=Music, Misc, Art, Photography, Design, Writing, Biography
        const queryObject = url.parse(req.url, true).query;
        const types = queryObject.types.split(',')
        const sites = await CoolSitesDAO.getSitesByTypes(
            types
            // filters,
            // page,
            // artistsPerPage,
        )

        let response = {
            sites: sites,
            // entries_per_page: 20
        }
        res.json(response)
    }

}


