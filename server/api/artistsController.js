import express from "express"
import MusicArtistsDAO from "../access/musicArtistsDAO.js"

export default class MusicArtistsController {
    static async apiGetArtists(req, res, next) {
        const artistsPerPage = 20
        const artists = await MusicArtistsDAO.getArtists(
            // filters,
            // page,
            // artistsPerPage,
        )

        let response = {
            artists: artists,
            // entries_per_page: 20
        }
        res.json(response)
    }

}


