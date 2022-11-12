import express from "express"
import cors from "cors"

// import restaurants from "./api/restaurants.route.js"
// import artists from "./api/artistsController.js"
import artists from "./api/artistsRoute.js"
import photographers from "./api/photographersRoute.js"
import galleryPhotographs from "./api/photographyGalleryRoute.js"
import goodreadsBooks from "./api/goodreadsRoute.js"
// import spotifyWrappedTracks from "./api/wrappedRoute.js"

// couldn't figure out how to get the route to work for post fxn
// import emailSubmission from "./api/emailSubmissionRoute.js"
import EmailSubmissionController from "./api/emailSubmissionController.js"
import MessageSubmissionController from './api/messageSubmissionController.js'
import SpotifyWrappedController from "./api/wrappedController.js"
import CoolSitesController from "./api/coolSitesController.js"

import bodyParser from "body-parser"

const app = express()
app.use(cors())
// app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());
// app.options('*', cors())

// app.post('/api/v1/emailsubmission', emailSubmission)
app.post('/api/v1/emailsubmission', async function(req, res){
  // console.log('test');
  EmailSubmissionController.apiPushEmail(req, res)
})

app.post('/api/v1/messagesubmission', async function(req, res){
  // console.log('test');
  MessageSubmissionController.apiPushMessage(req, res)
})

app.get("/api/v1/spotifywrappedtracks", async function(req, res) {
  SpotifyWrappedController.apiGetTracks(req, res)
})

app.get("/api/v1/coolsites", async function(req, res) {
  CoolSitesController.apiGetSites(req, res)
})

app.use("/api/v1/artists", artists)
app.use("/api/v1/photographers", photographers)
app.use("/api/v1/galleryphotographs", galleryPhotographs)
app.use("/api/v1/goodreadsbooks", goodreadsBooks)
// app.use("/api/v1/spotifywrappedtracks", spotifyWrappedTracks)
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

export default app
