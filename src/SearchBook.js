import React from 'react'
import escapeRegExp from 'escape-string-regexp'
import { Link } from 'react-router-dom'

class SearchBook extends React.Component {

  state = {
    query: ""
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim()})
  }

  clearQuery = () => {
    console.log('------cleared query');
    this.setState({query: ""})
  }

  render() {
    const { onChangeShelf, books, showingBooks, onSearchBook } = this.props
    const { query } = this.state

    let searchedBooks
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      onSearchBook(query,8)
      if (showingBooks) { searchedBooks = showingBooks}
    }
    else { searchedBooks = books}


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
            onChange={(event)=> this.updateQuery(event.target.value)}
            />
          </div>
        </div>

        {searchedBooks.length !== books.length && (
          <div className='search-books-results'>
            <span>Now showing {searchedBooks.length} of {searchedBooks.length} total</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}

        <div className="search-books-results">
          <ol className="books-grid">
          {searchedBooks.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 200, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                <div className="book-shelf-changer">
                  <select value={book.shelf} onChange={(event)=>onChangeShelf(book,event.target.value)}>
                    <option value="none" disabled>Move to...</option>
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
