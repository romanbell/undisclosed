import express from "express"
import PhotographersController from "./photographersController.js"

const router = express.Router()

// router.route("/").get((req, res) => res.sendStatus(200))
router.route("/").get(PhotographersController.apiGetPhotographers)

// TODO: Add in post, put, delete router

export default router
