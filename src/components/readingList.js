import React, { Component } from 'react';
// const RIGHT_ARROW = 39;
// const LEFT_ARROW = 37; 
// window.addEventListener("keydown", console.log('kd'))


export default class ReadingList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        books: {'books': {'name': 'await'}},
        book_ids: [],
        idx: 0,
        maxIdx: 0,
        page: 0
    };
}

async componentDidMount() {
    // GET request using fetch with set headers
    const headers = { 'Content-Type': 'application/json' }
    const response = await fetch('http://localhost:5000/api/v1/goodreadsbooks', { headers })
    const JSONresponse = await response.json()
    this.setState({books: JSONresponse})
    

    const { books } = this.state;
    var books_data_obj = {}
    var book_ids = []
    if (books.books.name !== 'await') {

        for (let elem of books.books){
            book_ids.push(elem._id)
        }

        var j = 0; 
        for (let entry of books.books) {
            let tmp = {}
            tmp['book_title'] = entry.title
            tmp['book_title_link'] = entry.title_link
            tmp['author'] = entry.author
            tmp['author_link'] = entry.author_link
            tmp['date_read_string'] = entry.date_read_string
            books_data_obj[book_ids[j]] = tmp
            j = j + 1;  
        }
        this.setState({maxIdx: j})
        this.setState({maxPage: parseInt(Math.ceil(j / 24) - 2)})
    }
    else {
        books_data_obj = ['No books to show, hope you arent here to learn!']
    }

    this.setState({book_ids: book_ids})
    this.setState({books: {books_data_obj}})
    this.setState({idx: 0})
    this.setState({page: 0})
}

get_book(idx) {
    if (this.state.books.books_data_obj !== undefined) {
        return this.state.books.books_data_obj[this.state.book_ids[idx]].book_title      
    }
    else {
        return '---'
    }
}

get_book_link(idx) {
  if (this.state.books.books_data_obj !== undefined) {
      return this.state.books.books_data_obj[this.state.book_ids[idx]].book_title_link      
  }
  else {
      return '---'
  }
}

get_author(idx) {
  if (this.state.books.books_data_obj !== undefined) {
      return this.state.books.books_data_obj[this.state.book_ids[idx]].author      
  }
  else {
      return '---'
  }
}

get_author_link(idx) {
  if (this.state.books.books_data_obj !== undefined) {
      return this.state.books.books_data_obj[this.state.book_ids[idx]].author_link      
  }
  else {
      return '---'
  }
}

get_date_read(idx) {
  if (this.state.books.books_data_obj !== undefined) {
      return this.state.books.books_data_obj[this.state.book_ids[idx]].date_read_string      
  }
  else {
      return '---'
  }
}

populate_book_elements(page) {
    // Change this once you read more than 100 books
    let book_slicer = [0, 99]
    // let book_slicer = [0, 24]
    // switch(page) {
    //     case page = 0:
    //         book_slicer = [0, 24]
    //         break;
    //     case page = 1:
    //         book_slicer = [25, 49]
    //         break;
    //     case page = 2:
    //         book_slicer = [50, 74]
    //         break;
    //     case page = 3:
    //         book_slicer = [75, 99]
    //         break;
    //     default:
    //         book_slicer = [0, 24]
          
    // }
    let row_array = []
    for (let i=book_slicer[0]; i<book_slicer[1]; i++) {
        if (i <= this.state.maxIdx - 1) {
            let entry = {}
            entry.bookName = this.get_book(i)
            entry.bookLink = this.get_book_link(i)
            entry.author = this.get_author(i)
            entry.authorLink = this.get_author_link(i)
            entry.dateRead = this.get_date_read(i)
            row_array.push(entry)
        }
    }
    return row_array
}

// Previously used with pages
// get_next_page_book_elements() {
//     if (this.state.page >= this.state.maxPage) {
//         this.setState({page: 0})
//     }
//     else {
//         this.setState({page: this.state.page + 1})
//     }
//     this.populate_book_elements(this.state.page)
// }

// get_prev_page_book_elements() {
//     if (this.state.page > 0) {
//         this.setState({page: this.state.page - 1})
//     }
//     else {
//         this.setState({page: this.state.maxPage})
//     }
//     this.populate_book_elements(this.state.page)
// }

get_date_last_update() {
    let dt_str = ""
    let last_dt = this.get_date_read(0)
    dt_str = last_dt.slice(0, 4).concat("-" + last_dt.slice(4, 6)) 
    return dt_str;  
}

render() {
    return (
        <div>
            <div className="subheadingWrapper">
                <div className="subheadingTitle">
                    <p>Recently Read</p>
                </div>
                <div className="subheadingCaption">
                    <p>Sourced from GoodReads {this.get_date_last_update()}</p> 
                    <br></br>
                </div>
            </div>

            <div className="wrappedScrollBox">
                <div className="musicArtistsContentWrapper">
                <ul>
                    {
                    this.populate_book_elements(this.state.page).map((row) => (
                        <li>
                            {row.dateRead} ---  
                            <a href = {row.bookLink} target="_blank" rel="noopener noreferrer"> {row.bookName}</a> --- 
                            <a href = {row.authorLink} target="_blank" rel="noopener noreferrer"> {row.author} </a> 
                        </li>
                    ))
                    }
                </ul>
                </div>
            </div>
        </div>            
    );
}
} 