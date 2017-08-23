import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf';
import SearchBooksBar from './SearchBooksBar';
import SearchBooksResults from './SearchBooksResults';
import If from './If';

const Loading = require('react-loading-animation');

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
    showLoadingSearchResult: false,
    showSearchPage: false,
    books: [],
    searchedBooks: [],
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
  };

  updateSearchedBooks = (searchedBooks) => { 
    this.setState({ searchedBooks });
  };

  showLoadingSearchResult = (shouldShow) => { 
    this.setState({ showLoadingSearchResult: shouldShow });
  };

  searchBooks = (query) => {   
    this.showLoadingSearchResult(true);
    BooksAPI.search(query, 10).then((books) => {  
      this.showLoadingSearchResult(false);
      if(books && books.length > 0) { 
        this.updateSearchedBooks(books) 
      }
    })
  }; 
  
  handleBookUpdate = (book, shelfState) => {  
    BooksAPI.update(book, shelfState);
  }

  handleBookShelfStateUpdate = (book, shelfState) => {     
    let targetBook = this.state.books.filter((b) => b.id === book.id)[0]
    targetBook.shelf = shelfState;

    let bookList = this.state.books.filter((b) => b.id !== book.id);
 
    bookList.push(targetBook);

    this.updateBooks(bookList);

    BooksAPI.update(book, shelfState);
  }

  render() {

    const { loading, wantToReadList, currentlyReadingList, readList, searchedBooks, showLoadingSearchResult } = this.state;

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <SearchBooksBar onSearchBooks={this.searchBooks}/>

            <Loading isLoading={showLoadingSearchResult} width='100px' height='100px'>
              <SearchBooksResults 
                  books={searchedBooks}
                  handleBookUpdate={this.handleBookUpdate}/>
            </Loading>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">  
                <Loading isLoading={loading} width='100px' height='100px'>
                  <div>
                    <If test={currentlyReadingList.length > 0}> 
                      <Bookshelf  
                        handleBookShelfStateUpdate={this.handleBookShelfStateUpdate}
                          books={currentlyReadingList} 
                          bookshelfTitle="Currently Reading"/> 
                    </If>
                    <If test={wantToReadList.length > 0}>
                      <Bookshelf  
                        handleBookShelfStateUpdate={this.handleBookShelfStateUpdate}
                          books={wantToReadList}  
                          bookshelfTitle="Want to Read"/> 
                    </If>
                    <If test={readList.length > 0}> 
                      <Bookshelf  
                        handleBookShelfStateUpdate={this.handleBookShelfStateUpdate}
                        books={readList} 
                        bookshelfTitle="Read"/>  
                    </If> 
                  </div>
                </Loading> 
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
