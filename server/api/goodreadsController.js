import express from "express"
import GoodreadsDAO from "../access/goodreadsDAO.js"

export default class GoodreadsController {
    static async apiGetBooks(req, res, next) {
        const booksPerPage = 40
        const books = await GoodreadsDAO.getBooks(
            // filters,
            // page,
            // artistsPerPage,
        )

        let response = {
            books: books,
            // entries_per_page: 20
        }
        res.json(response)
    }

}


