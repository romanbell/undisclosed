import express from "express"
import MusicArtistsController from "./artistsController.js"

const router = express.Router()

// router.route("/").get((req, res) => res.sendStatus(200))
router.route("/").get(MusicArtistsController.apiGetArtists)

// TODO: Add in post, put, delete router

export default router
