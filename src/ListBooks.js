import React from 'react'
import { Link } from 'react-router-dom'

class ListBooks extends React.Component {

  state = {
    shelves: [
      {
        shelf: "currentlyReading",
        title: "Currently Reading"
      },
      {
        shelf: "wantToRead",
        title: "Want To Read"
      },
      {
        shelf: "read",
        title: "Read"
      }
    ]
  }

  render(){
    const {books}=this.props
    const {shelves}=this.state

    let showingBooks
    showingBooks = books

    return (

      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
          {shelves.map((each)=> (
              <div key={each.title} className="bookshelf">
                <h2 className="bookshelf-title">{each.title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {showingBooks = this.props.books.filter((book)=> book.shelf===each.shelf).map((book)=>(
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 200, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                      <div className="book-shelf-changer">
                        <select onChange={(event)=>this.props.onChangeShelf(book,event.target.value)}>
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
            ))}

          <div className="open-search">
            <Link
            to="/search"
            >Add a book</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
}
export default ListBooks
