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
    books: []
  }


componentWillMount(){
  BooksAPI.getAll().then((books) => {
    this.setState({ books })
    console.log("from Mount ",this.state.books)
  })
}

shelfChanger = (book, shelf) => {
  console.log('Passed into shelfChanger, ',book.title,shelf);
  BooksAPI.update(book, shelf).then(updated => {
    this.setState(state => ({
      books: updated
    }))
      console.log("updated book from state are: ", updated);
      console.log('should be the same: ', this.state.books);
  })
}

searchBook = (query, max) => {
  BooksAPI.search(query, max).then((results) => {
    console.log(results, this.results);
  })
}

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route path="/search" render={(history)=>(
            <SearchBook
            books={this.state.books}
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
