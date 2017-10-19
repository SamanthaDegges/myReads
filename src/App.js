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
    showingBooks: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState(state => ({
        books: books
      }))
    })
  }

  shelfChanger = (book, nShelf) => {
    book.shelf = nShelf
    BooksAPI.update(book, nShelf).then(
      this.setState(state => ({
        books: state.books.filter(each => each.id !== book.id).concat(book)
      }))
    )
  }

  searchBook = (query, max) => {
    BooksAPI.search(query, max).then((results) => {
      if(results && !results.error) {
        this.setState({
         showingBooks: results
        })
      }
    })}

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route path="/search" render={({history})=>(
            <SearchBook
            books={this.state.books}
            onSearchBook={(query, max) => {
              this.searchBook(query,max)
            }}
            showingBooks={this.state.showingBooks}
            onChangeShelf={(book, shelf) => {
              this.shelfChanger(book,shelf)
            }}

            />
          )}
          />
          <Route exact path="/" render={({history})=>(
            <ListBooks
            books={this.state.books}
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
