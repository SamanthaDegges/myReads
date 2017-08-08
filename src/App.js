import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook.js'
import ListBooks from './ListBooks.js'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  /**
   * TODO:add prop type checking
*/
  state = {
    showSearchPage: false,
    books: []
  }


componentWillMount(){
  BooksAPI.getAll().then((books) => {
    this.setState({ books })
    console.log("from Mount ",this.state.books)
  })
}

shelfChanger = (book, shelf) => {
  console.log('from shelfChanger, ',book,shelf);
  BooksAPI.update(book, shelf)
  this.componentWillMount()
  return book
}

searchBook = (query, max) => {
  BooksAPI.search(query, max).then((results) => {
    console.log(results, this.results);
  })
}

  render() {
    return (
      <div className="app">
      <Route path="/search" render={()=>(
        <SearchBook
        books={this.state.books}
        onChangeShelf={this.shelfChanger}
        />
      )}
      />
      <Route exact path="/" render={()=>(
        <ListBooks
        onChangeShelf={this.shelfChanger}
        books={this.state.books}
        />
      )}
      />
      </div>
    )
  }
}

export default BooksApp
