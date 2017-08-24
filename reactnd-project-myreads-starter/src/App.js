import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf';
import SearchBooksBar from './SearchBooksBar';
import SearchBooksResults from './SearchBooksResults';
import If from './If';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Loading = require('react-loading-animation');

const ShelfCategory = { 
  CurrentlyReading:  "currentlyReading",
  WantToRead:  "wantToRead",
  Read:  "read"
};

class BooksApp extends React.Component { 

  state = { 
    loading: true,
    showLoadingSearchResult: false, 
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
  
  findBook = (book, bookId) => { 
      return book.id === bookId;
  };

  handleBookShelfStateUpdate = (book, shelfState) => {     
    let targetBook = this.state.books.filter((b) => b.id === book.id)[0];

    let bookList = this.state.books.filter((b) => b.id !== book.id);

    if(!targetBook) { 
      book.shelf = shelfState; 
      targetBook = book;
    } else {
      targetBook.shelf = shelfState; 
    }

    bookList.push(targetBook);

    this.updateBooks(bookList);

    BooksAPI.update(book, shelfState);
  };

  render() {

    const { 
            loading, 
            wantToReadList, 
            currentlyReadingList, 
            readList, searchedBooks, 
            showLoadingSearchResult 
          } = this.state;

    return (
      <div className="app">
        <Route exact path="/" render={ () => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">  
                <Loading isLoading={loading} width='100px' height='100px' margin='auto' style={{ top: '100px' }} >
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
              <Link to="/search" className="add-contact">Add a book</Link>
            </div>
          </div>
        )} />
        <Route exact path="/search" render={ ({ history }) => (
          <div className="search-books">
            <SearchBooksBar
                onBackPressed={() => history.push("/")}
                onSearchBooks={this.searchBooks}/>

            <Loading isLoading={showLoadingSearchResult} width='100px' height='100px' margin='auto' style={{ top: '100px' }} >
              <SearchBooksResults 
                  wantToReadList={wantToReadList}
                  currentlyReadingList={currentlyReadingList}
                  readList={readList} 
                  books={searchedBooks}
                  handleBookUpdate={this.handleBookShelfStateUpdate}/>
            </Loading>
          </div>
        )} /> 
      </div>
    );
  };
};

export default BooksApp
