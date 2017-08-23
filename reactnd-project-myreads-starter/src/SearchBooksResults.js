import React, {Component} from 'react'; 
import PropTypes from 'prop-types';
import BooksGrid from './BooksGrid'; 

class SearchBooksResults extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        handleBookUpdate: PropTypes.func.isRequired
    };

    updateBookShelfState = (book, shelfState) => {
        console.log(shelfState)
        this.props.handleBookUpdate(book, shelfState)
    };

    render() {

        const { books } = this.props;  

        return (
            <div className="search-books-results">
            <BooksGrid 
                    books={books}
                    onBookShelfStateChanged={this.updateBookShelfState}/>
            </div> 
        );
    }
};

export default SearchBooksResults;