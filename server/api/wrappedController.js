import express from "express"
import WrappedDAO from "../access/spotifyWrappedDAO.js"
import url from "url"

export default class SpotifyWrappedController {
    static async apiGetTracks(req, res, next) {
        const queryObject = url.parse(req.url, true).query;
        const year = parseInt(queryObject.year)
        const tracks = await WrappedDAO.getTopTracksByYear(
            year
            // filters,
            // page,
            // artistsPerPage,
        )

        let response = {
            tracks: tracks,
            // entries_per_page: 20
        }
        res.json(response)
    }

}


