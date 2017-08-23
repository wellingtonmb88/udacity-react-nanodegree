import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf';
import SearchBooksBar from './SearchBooksBar';
import SearchBooksResults from './SearchBooksResults';
import If from './If'; 

const ShelfCategory = { 
  CurrentlyReading:  "currentlyReading",
  WantToRead:  "wantToRead",
  Read:  "read"
}

class BooksApp extends React.Component { 

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    loading: true,
    showSearchPage: false,
    books: [],
    wantToReadList: [],
    currentlyReadingList: [],
    readList: []
  }; 
 
  componentDidMount() {
    BooksAPI.getAll().then((books) => { 
      this.setState({loading: false}) 
      this.updateBooks(books);
    })
  };

  updateBooks = (books) => { 
    this.setState({ currentlyReadingList: books.filter((book) => book.shelf === ShelfCategory.CurrentlyReading) });
    this.setState({ wantToReadList: books.filter((book) => book.shelf === ShelfCategory.WantToRead) });
    this.setState({ readList: books.filter((book) => book.shelf === ShelfCategory.Read) });
    this.setState({ books });
  }

  // updateShelves = (shelves) => {

  //   const tempWantToReadList = [];
  //   const tempCurrentlyReadingList = [];
  //   const tempReadList = [];

  //   shelves.currentlyReading.forEach( (bookId) => {
  //     this.state.books.filter((book) => book.id === bookId)
  //     .forEach((book) => {
  //       book.shelf = ShelfCategory.CurrentlyReading
  //       tempCurrentlyReadingList.push(book)
  //     })
  //   });

  //   shelves.wantToRead.forEach( (bookId) => {
  //     this.state.books.filter((book) => book.id === bookId)
  //     .forEach((book) => {
  //       book.shelf = ShelfCategory.WantToRead
  //       tempWantToReadList.push(book)
  //     })
  //   });

  //   shelves.read.forEach( (bookId) => { 
  //     this.state.books.filter((book) => book.id === bookId)
  //     .forEach((book) => {
  //       book.shelf = ShelfCategory.Read
  //       tempReadList.push(book)
  //     })
  //   });
    
  //   this.setState({ currentlyReadingList: tempCurrentlyReadingList });
  //   this.setState({ wantToReadList: tempWantToReadList });
  //   this.setState({ readList: tempReadList })
  // }

  handleBookShelfStateSubmit = (book, shelfState) => {    
    const tempBooks = []
    this.state.books.forEach(book => {
      tempBooks.push(Object.assign({}, book));
    });

    const filteredBooks = tempBooks.filter((b) => b.id === book.id);
 
    filteredBooks.forEach((book) => { 
      book.shelf = shelfState 
    });

    this.updateBooks(tempBooks)

    BooksAPI.update(book, shelfState)
  }

  render() {

    const { loading, wantToReadList, currentlyReadingList, readList } = this.state;

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <SearchBooksBar />
            <SearchBooksResults />
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content"> 
              {loading ? (
                  <p>Loading</p>
                ):(
                  <div>
                    <If test={currentlyReadingList.length > 0}> 
                      <Bookshelf  
                          handleBookShelfStateSubmit={this.handleBookShelfStateSubmit}
                          books={currentlyReadingList} 
                          bookshelfTitle="Currently Reading"/> 
                    </If>
                    <If test={wantToReadList.length > 0}>
                      <Bookshelf  
                          handleBookShelfStateSubmit={this.handleBookShelfStateSubmit}
                          books={wantToReadList}  
                          bookshelfTitle="Want to Read"/> 
                    </If>
                    <If test={readList.length > 0}> 
                      <Bookshelf  
                        handleBookShelfStateSubmit={this.handleBookShelfStateSubmit}
                        books={readList} 
                        bookshelfTitle="Read"/>  
                    </If> 
                  </div>
                  )}
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
