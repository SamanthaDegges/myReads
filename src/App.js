import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook.js'
import ListBooks from './ListBooks.js'

class BooksApp extends React.Component {
  /**
   * TODO:add prop type checking
*/
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true,
    books: []
  }


componentDidMount(){
  BooksAPI.getAll().then((books) => {
    this.setState({ books })
    console.log(this.state.books)
  })
}

removeBook = (book) => {
  this.setState((state) => ({
    books: state.books.filter((b) => b.id !== book.id)
  }))
  BooksAPI.remove(book)
}

shelfChanger = (book, shelf) => {
  BooksAPI.update(book, shelf);
}

searchBook = (query, max) => {
  BooksAPI.search(query, max).then((results) => {
    console.log(results, this.results);
  })
}


  render() {
    //move html to components. Declare methods on props.
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBook
          onSearchBook={this.searchBook}
          books={this.state.books}
          />
        ) : (
          <ListBooks />
        )}
      </div>
    )
  }
}

export default BooksApp
