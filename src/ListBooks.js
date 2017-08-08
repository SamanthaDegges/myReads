import React from 'react'

class ListBooks extends React.Component {

  state = {
    shelves: [
      {
        shelf: "curr",
        books: [],
        title: "Currently Reading"
      },
      {
        shelf: "want",
        books: [],
        title: "Want To Read"
      },
      {
        shelf: "read",
        books: [],
        title: "Read"
      }
    ]
  }

  render(){
    const { books } = this.props

    this.state.shelves.map((each, num, arr) => {
      const match = new RegExp(each.shelf)
      each.books = books.filter((book) => {
        return book.shelf !== "none" && match.test(book.shelf)
      })
      return false
    })

//none means remove from db?
//select.on change, value of option is grabbed and passed into shelfChanger on props.
//Then trigger new loading of books via ComponentDidMount, or remove book from page and then get just that book again.
      return (

        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {this.state.shelves.map((each) => (
                <div className="bookshelf" key={each.title}>
                  <h2 className="bookshelf-title">{each.title}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {each.books.map((book) => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 200, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                          <div className="book-shelf-changer">
                            <select onChange={(event)=>this.props.onChangeShelf({book},event.target.value)}>
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
              <a onClick={this.props.onNavigate}
              href="#search"
              >Add a book</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default ListBooks
