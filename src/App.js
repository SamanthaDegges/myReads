import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook.js'
import ListBooks from './ListBooks.js'
import { Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

class BooksApp extends React.Component {
  /**
   * TODO:add prop type checking
*/
  state = {
    books: [],
    currBooks: [],
    readBooks: [],
    wantBooks: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState(state => ({
        books: books,
        currBooks: books.filter((book)=>book.shelf === "currentlyReading"),
        readBooks: books.filter((book)=>book.shelf === "read"),
        wantBooks: books.filter((book)=>book.shelf === "wantToRead")
      }))
    })
  }

  shelfChanger = (book, shelf) => {
    BooksAPI.update(book, shelf).then(updated => {
      this.setState(state => ({
        books: updated,
        currBooks: updated.currentlyReading,
        wantBooks: updated.wantToRead,
        readBooks: updated.read
      }))
    })
  }

  searchBook = (query, max) => {
    BooksAPI.search(query, max).then((results) => {
      this.setState({
        showingBooks: results
      })
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route path="/search" render={({history})=>(
            <SearchBook
            books={this.state.books}
            currBooks={this.state.currBooks}
            wantBooks={this.state.wantBooks}
            readBooks={this.state.readBooks}
            onChangeShelf={(book, shelf) => {
              this.shelfChanger(book,shelf)
            }}
            />
          )}
          />
          <Route exact path="/" render={({history})=>(
            <ListBooks
            books={this.state.books}
            currBooks={this.state.currBooks}
            wantBooks={this.state.wantBooks}
            readBooks={this.state.readBooks}
            onChangeShelf={(book, shelf)=> {
              this.shelfChanger(book, shelf)
            }}
            />
          )}
          />
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
