import React, {Component} from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class Bookshelf extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        bookshelfTitle: PropTypes.string.isRequired,
        handleBookShelfStateSubmit: PropTypes.func.isRequired
    }

    updateBookShelfState = (book, shelfState) => {
        this.props.handleBookShelfStateSubmit(book, shelfState);
    }

    render() {

        const { books, bookshelfTitle } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{bookshelfTitle}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid"> 
                    {books.map((book) => (
                        <li key={book.id}> 
                            <Book 
                                book={book}
                                updateBookShelfState={this.updateBookShelfState}/>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
        );
    }
};

export default Bookshelf;