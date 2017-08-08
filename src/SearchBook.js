import React from 'react'
import escapeRegExp from 'escape-string-regexp';

class SearchBook extends React.Component {

  state = {
    query: ""
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim()})
  }

  clearQuery = () => {
    this.setState({query: ""})
  }

  render() {
    const { books} = this.props
    const { query } = this.state
    console.log(books);

    let showingBooks
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = this.props.books.filter((book)=> match.test(book.authors[0])|match.test(book.title))
      console.log('showingBooks is: ',showingBooks);
    }
    else {
      showingBooks = books;
        }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search"
            href = "#main"
            onClick={this.props.onNavigate}
          >Close</a>
          <div className="search-books-input-wrapper">
            <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>

        {showingBooks.length !== books.length && (
                  <div className='search-books-results'>
                    <span>Now showing {showingBooks.length} of {showingBooks.length} total</span>
                    <button onClick={this.clearQuery}>Show all</button>
                  </div>
                 )}

        <div className="search-books-results">
          <ol className="books-grid">
          {showingBooks.map((book) => (
          <li key={book.id}>

            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 200, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                <div className="book-shelf-changer">
                  <select>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors[0]}</div>
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
