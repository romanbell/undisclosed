import app from "./server.js"
import mongodb from "mongodb"
//import dotenv from "dotenv"
import MusicArtistsDAO from "./access/musicArtistsDAO.js"
import PhotographersDAO from "./access/photographersDAO.js"
import PhotographsGalleryDAO from "./access/photographyGalleryDAO.js"
import GoodreadsDAO from "./access/goodreadsDAO.js"
import WrappedDAO from "./access/spotifyWrappedDAO.js"
import EmailSubmissionDAO from "./access/emailSubmissionDAO.js"
import MessageSubmissionDAO from "./access/messageSubmissionDAO.js"
import CoolSitesDAO from "./access/coolSitesDAO.js"

//dotenv.config()
const MongoClient = mongodb.MongoClient
//const port = process.env.PORT
const port = 5000

const MONGO_PWD = 'XXXXXXXXX'

MongoClient.connect(
    "mongodb+srv://romanbell:" + MONGO_PWD + "@cluster0.qzaqz.mongodb.net/undisclosed_db?retryWrites=true&w=majority",
        {
        wtimeoutMS: 2500,
        }
    ).catch(
        err => {
        console.error(err.stack)
        process.exit(1)
    }).then(async client => {
        await MusicArtistsDAO.injectDB(client),
        await PhotographersDAO.injectDB(client),
        await PhotographsGalleryDAO.injectDB(client),
        await GoodreadsDAO.injectDB(client),
        await WrappedDAO.injectDB(client),
        await CoolSitesDAO.injectDB(client), 
        await EmailSubmissionDAO.injectDB(client),
        await MessageSubmissionDAO.injectDB(client),
        app.listen(port, () => {
            console.log('listening on port ' + port)
        })
    })
