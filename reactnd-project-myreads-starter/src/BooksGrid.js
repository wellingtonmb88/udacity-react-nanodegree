import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book'; 

class BooksGrid extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onBookShelfStateChanged: PropTypes.func.isRequired
    }

    updateShelfState = (book, shelfState) => { 
        this.props.onBookShelfStateChanged(book, shelfState);
    }

    render() {

        const { books } = this.props;

        return ( 
            <ol className="books-grid"> 
                    {books.map((book) => (
                        <li key={book.id}> 
                            <Book 
                                book={book}
                                onBookShelfStateChanged={this.updateShelfState}/>
                        </li>
                    ))}
            </ol>           
        );
    }
};

export default BooksGrid;