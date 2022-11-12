import express from "express"
import GoodreadsController from "./goodreadsController.js"

const router = express.Router()

// router.route("/").get((req, res) => res.sendStatus(200))
router.route("/").get(GoodreadsController.apiGetBooks)

// TODO: Add in post, put, delete router

export default router
