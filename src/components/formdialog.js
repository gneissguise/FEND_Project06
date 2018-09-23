import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: '',
      title: '',
      author: '',
      description: '',
      rating: 0,
      status: null,
      img: { url: '', alt: '' }
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClose = () => this.props.closeDialog()

  handleChange = (e) => this.setState ({ [e.target.id]: e.target.value })

  handleAdd = () => {
    const book = {
      id: this.state.id,
      title: this.state.title,
      author: this.state.author,
      description: this.state.description,
      rating: this.state.rating,
      status: this.props.bookList,
      img: this.state.img
    }

    this.props.addBook(book)
    this.props.closeDialog()
  }

  render() {
    return (
      <>
        <Dialog
                open={this.props.dialogState}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Book</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add a new book to your list:
            </DialogContentText>
            <TextField
                       autoFocus
                       margin="dense"
                       id="title"
                       label="Title"
                       type="text"
                       fullWidth
                       value={this.state.title}
                       onChange={this.handleChange} />
             <TextField
                        margin="dense"
                        id="author"
                        label="Author"
                        type="text"
                        fullWidth
                        value={this.state.author}
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
      </>
    )
  }
}
