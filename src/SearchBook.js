import React from 'react'
import { Link } from 'react-router-dom'

class SearchBook extends React.Component {

  state = {
    query: ""
  }

  updateSearchedBooks = (query) => {
    this.setState({ query: query.trim()})
    query && this.props.onSearchBook(query, 20)
  }

  render() {
    const { onChangeShelf, books, showingBooks } = this.props
    const { query } = this.state

    let searchedBooks = showingBooks.map((searchBook) => {
      if(searchBook !== null || 'undefined'){
          books.map((ownedBook) => {
            if (searchBook.id === ownedBook.id) {
                searchBook.shelf = ownedBook.shelf
            }
              return searchBook
          })
          return searchBook
        }
        return searchBook
      })

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search"
            to="/"
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(event)=> this.updateSearchedBooks(event.target.value)}
            />
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">

          {searchedBooks.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 200, backgroundImage: `url(${book.imageLinks?book.imageLinks.thumbnail:'http://via.placeholder.com/128x193?text=No%20Cover'})`}}></div>
                <div className="book-shelf-changer">
                <select value={book.shelf?book.shelf:"none"} onChange={(event)=>onChangeShelf(book,event.target.value)}>
                    <option disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors ? book.authors[0] : "no author listed"}</div>
            </div>
          </li>
        ))}

        </ol>
      </div>
    </div>
    )
  }
}

export default SearchBook
