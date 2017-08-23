import React, {Component} from 'react';
import BookshelfChanger from './BookshelfChanger';
import PropTypes from 'prop-types';

class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        updateBookShelfState: PropTypes.func.isRequired
    }

    updateShelfState = (state) => { 
        this.props.updateBookShelfState(this.props.book, state);
    }

    render() {

        const { book } = this.props;

        return ( 
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}/>
                    <BookshelfChanger 
                        bookState={book.shelf}
                        updateShelfState={this.updateShelfState}/>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors.map( (author) => (
                    <div key={author} className="book-authors">{author}</div>
                ))}
            </div>             
        );
    }
};

export default Book;