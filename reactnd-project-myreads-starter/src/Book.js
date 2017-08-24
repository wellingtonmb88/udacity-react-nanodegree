import React, {Component} from 'react';
import BookshelfChanger from './BookshelfChanger';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI'
import * as CancelablePromise from './CancelablePromise'
 

class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        onBookShelfStateChanged: PropTypes.func.isRequired
    }

    state = {
        updatedBook: {}
    }

    cancelablePromise = CancelablePromise.createCancelablePromise (BooksAPI.get(this.props.book.id));

    componentDidMount() {  
        const isCanceled = this.cancelablePromise.isCanceled;
        if(!isCanceled) {
            this.cancelablePromise.promise
            .then((book) => {  
                this.setState({updatedBook: book})  
            })
            .catch((reason) => console.log('isCanceled', reason.isCanceled))
        }
    }; 

    componentWillUnmount() {
        this.cancelablePromise.cancel();
    }

    updateShelfState = (state) => { 
        this.props.onBookShelfStateChanged(this.state.updatedBook, state);
    };

    getThumbnail = (book) => {
        if(book.imageLinks && book.imageLinks.thumbnail) {
            return `url("${book.imageLinks.thumbnail}")`
        } else { 
            return "./icons/defbookcover.jpg"
        }
    };

    render() {

        const { updatedBook } = this.state; 

        return ( 
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" 
                            style={{ width: 128, height: 193, backgroundImage: this.getThumbnail(updatedBook) }}/>
                    <BookshelfChanger  
                        shelfState={(updatedBook.shelf ? updatedBook.shelf : "none")}
                        onShelfStateChanged={this.updateShelfState}/>
                </div>
                <div className="book-title">{updatedBook.title}</div>
                { updatedBook.authors ? (updatedBook.authors.map( (author) => (
                    <div key={author} className="book-authors">{author}</div>
                    ))
                ): (<div />)
                }
            </div>             
        );
    }
};

export default Book;