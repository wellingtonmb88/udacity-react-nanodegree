
/**
 * Reference from: @see https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
 */

export const createCancelablePromise = (promise) => {
    let hasCanceled_ = false;
  
    const wrappedPromise = new Promise((resolve, reject) => { 
            promise.then(
              val => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
              error => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
            ) 
    });
  
    return { 
        promise: wrappedPromise,
        isCanceled: hasCanceled_,
        cancel() {
            hasCanceled_ = true;
        }
    };
  };


//    const cancelablePromise = CancelablePromise.createCancelablePromise (BooksAPI.get(this.props.book.id));

//     componentDidMount() {  
//         const isCanceled = this.cancelablePromise.isCanceled;
//         if(!isCanceled) {
//             this.cancelablePromise.promise
//             .then((book) => {  
//                 this.setState({updatedBook: book});
//                 this.setState({showLoading: false});  
//             })
//             .catch((reason) => console.log('isCanceled', reason.isCanceled))
//         }
//     }; 

//     componentWillUnmount() {
//         this.cancelablePromise.cancel();
//     }
