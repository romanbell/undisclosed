import express from "express"
import PhotographsGalleryDAO from "../access/photographyGalleryDAO.js"

export default class PhotographyGalleryController {
    static async apiGetGalleryPhotos(req, res, next) {
        const photographersPerPage = 20
        const galleryPhotos = await PhotographsGalleryDAO.getGalleryPhotographs(
            // filters,
            // page,
            // artistsPerPage,
            req
        )

        let response = {
            galleryPhotographs: galleryPhotos,
            // entries_per_page: 20
        }
        res.json(response)
    }

}


