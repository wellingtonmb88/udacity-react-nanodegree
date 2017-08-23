import React, {Component} from 'react';
import BookshelfChanger from './BookshelfChanger';
import PropTypes from 'prop-types';

class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        onBookShelfStateChanged: PropTypes.func.isRequired
    }

    updateShelfState = (state) => { 
        this.props.onBookShelfStateChanged(this.props.book, state);
    }

    getThumbnail = (book) => {
        if(book.imageLinks && book.imageLinks.thumbnail) {
            return `url("${book.imageLinks.thumbnail}")`
        } else { 
            return "./icons/defbookcover.jpg"
        }
    }

    render() {

        const { book } = this.props;

        return ( 
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: this.getThumbnail(book) }}/>
                    <BookshelfChanger 
                        bookState={(book.shelf ? book.shelf : "none")}
                        onShelfStateChanged={this.updateShelfState}/>
                </div>
                <div className="book-title">{book.title}</div>
                
                { book.authors ? (book.authors.map( (author) => (
                    <div key={author} className="book-authors">{author}</div>
                    ))
                ): (<div />)
                }
            </div>             
        );
    }
};

export default Book;