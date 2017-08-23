import React, {Component} from 'react'; 
import PropTypes from 'prop-types';

class SearchBooksResults extends Component {

    static propTypes = {
        books: PropTypes.array
    }

    render() {

        const { books } = this.props;

        return (
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
        );
    }
};

export default SearchBooksResults;