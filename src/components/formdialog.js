import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { search } from './books-api'

// Function to map api to book object for layout.js
const mapToBook = (r, list) => {
  return {
    id: r.id,
    title: r.title,
    author: r.authors.join(', '),
    description: r.description,
    rating: 0,
    status: list,
    img: { url: r.hasOwnProperty('imageLinks') ? r.imageLinks.smallThumbnail : '../images/book-default.jpg',
           alt: r.title }
  }
}

// Function/Component to render searched books
const SearchResult = ({ result, selectBook, list }) => {
  if (result.length > 0) {
    return (
      result.map((r) => {
        try {
          return (
            <div key={r.id}
                 className={r.selected ? "result selected" : "result" }
                 onClick={(e) => selectBook(r.id, mapToBook(r, list))}
                 id={r.id}>
              <img src={r.hasOwnProperty('imageLinks') ? r.imageLinks.smallThumbnail : ''} alt={r.title} />
              <div>
                <h5>{r.title}</h5>
                <p>{r.subtitle}</p>
                <em>By: {r.hasOwnProperty('authors') ? r.authors.join(', ') : 'N/A'}</em>
              </div>
            </div>)
        } catch (e) {
          console.log('Error:', e)
          return false
        }
      })
      )
    }
    else {
    return (<div className="result" />)
  }
}

// FormDialog is the dialog that pops up when you search for a book.
export default class FormDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchInput: '',
      searchResults: [],
      selectedBook: {}
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.selectBook = this.selectBook.bind(this)
    this.clearForm = this.clearForm.bind(this)
  }

  // Closes the search window
  handleClose = () => {
    this.props.closeDialog()
    this.clearForm()
  }

  // Handles the input value change, and also runs the search from the API!
  handleChange = (e) => {
    const searchInput = e.target.value.trim()
    if (searchInput.length > 0) {
      search(searchInput).then((result) => {
        if(!result.hasOwnProperty('error')){
          this.setState({ searchResults: result.map((r) => {
                                                              if (!r.hasOwnProperty('selected')) {
                                                                r.selected = false
                                                              }
                                                              return r
                                                            })
                        })
        }
      }, (err) => {
        alert(`The following error occured: ${err}`)
      })
    }
    else {
      this.setState({ searchResults: [] })
    }

    this.setState({ [e.target.id]: e.target.value })
  }

  // Handles adding a book, passing up the state
  handleAdd = () => {
    this.props.addBook(this.state.selectedBook)
    this.props.closeDialog()
    this.clearForm()
  }

  // Toggles if a book is selected
  selectBook = (id, book) => {
    const results = this.state.searchResults.map((s) => {
                                                          let book = s
                                                          if (book.id === id){
                                                            book.selected = true
                                                          }
                                                          else {
                                                            book.selected = false
                                                          }
                                                          return book
                                                        })
    this.setState({
      searchResults: results,
      selectedBook: book
    })
  }

  clearForm = () => {
    this.setState({
      searchInput: '',
      searchResults: [],
      selectedBook: {}
    })
  }

  // Renders the dialog / search form
  render() {
    return (
      <React.Fragment>
        <Dialog
                open={this.props.dialogState}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Book</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Search for a book to add to your list:
            </DialogContentText>
            <div className="scrollable">
              <SearchResult result={this.state.searchResults}
                            selectBook={this.selectBook}
                            list={this.props.bookList} />
            </div>
            <TextField
                       autoFocus
                       margin="dense"
                       id="searchInput"
                       label="Title or Author"
                       type="text"
                       fullWidth
                       value={this.state.searchInput}
                       onChange={this.handleChange} />
            </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAdd} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}
