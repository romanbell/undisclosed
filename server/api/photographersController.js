import express from "express"
import PhotographersDAO from "../access/photographersDAO.js"

export default class PhotographersController {
    static async apiGetPhotographers(req, res, next) {
        const photographersPerPage = 20
        const photographers = await PhotographersDAO.getPhotographers(
            // filters,
            // page,
            // artistsPerPage,
        )

        let response = {
            photographers: photographers,
            // entries_per_page: 20
        }
        res.json(response)
    }

}


