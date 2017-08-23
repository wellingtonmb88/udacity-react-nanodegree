import React, {Component} from 'react';
import PropTypes from 'prop-types';

class BookshelfChanger extends Component {

    static propTypes = {
        bookState: PropTypes.string.isRequired,
        onShelfStateChanged: PropTypes.func.isRequired
    }

    state = {
        state : 'none'
    }

    componentWillMount() { 
        this.setState({state: this.props.bookState});
    }

    change = (event) => {
        this.setState({state: event.target.value});
        this.props.onShelfStateChanged(event.target.value)
    }
 
    render(){
        const { state } = this.state 
        return ( 
            <div className="book-shelf-changer">
                <select onChange={this.change} value={state}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>                
        );
    }
};

export default BookshelfChanger;