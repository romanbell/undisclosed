import express from "express"
import PhotographyGalleryController from "./photographyGalleryController.js"

const router = express.Router()

// router.route("/").get((req, res) => res.sendStatus(200))
// router.route("/").get(PhotographyGalleryController.apiGetGalleryPhotos)

router.route('/').get(async function(req, res){
    // console.log('test');
    PhotographyGalleryController.apiGetGalleryPhotos(req, res)
  })

// TODO: Add in post, put, delete router

export default router
