import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import { Star, StarBorder } from '@material-ui/icons'
import Rating from 'react-rating'
import Avatar from '@material-ui/core/Avatar';

import ActionButton from './actionbutton'

// Creates a list for books to go into
class BookList extends React.Component {
  constructor(props) {
    super(props)

    this.handleRatingChange = this.handleRatingChange.bind(this)
  }

  // Handles the star rating change.
  handleRatingChange = (book, rating) => this.props.updateRating(book, rating)

  // Renders the list to the screen, and iterates through the book list
  render() {
    const { heading,
            id,
            filter,
            books,
            addBook,
            deleteBook,
            updateRating,
            openDialog,
            children } = this.props

    return (
      <div className='book-list-wrapper'>
        <header><h2>{heading}</h2></header>
        <Droppable droppableId={id}>
          {(provided, snapshot) => (
            <div className='book-list'
              ref={provided.innerRef}
              {...provided.droppableProps}>

              {books
                .filter(filter)
                .map((book, index) => (
                  <Draggable draggableId={book.id} index={index} key={book.id}>
                    {(provided, snapshot) => (
                      <div
                        className='book'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        key={book.id}>
                        <Avatar alt={book.img.alt}
                                src={book.img.url}
                                style={{ height: '3.25rem',
                                         width: '3.25rem',
                                         margin: '0 0.3rem 0 0',
                                         padding: '0' }} />
                        <span>
                        <h4>{book.title}</h4>
                        <p><em>By {book.author}</em></p>
                        <Rating onChange={(rating) => this.handleRatingChange(book, rating)}
                                placeholderRating={book.rating}
                                emptySymbol={<StarBorder />}
                                placeholderSymbol={<Star color='primary' />}
                                fullSymbol={<Star color='secondary' />}
                                style='{position: "absolute", bottom: "0.1rem"}'/>
                        <ActionButton action={deleteBook}
                                      params={book}
                                      ariaLabel='Delete'>
                          <DeleteIcon />
                        </ActionButton>
                      </span>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="add-button-container">
        <ActionButton action={openDialog}
                      params={id}
                      ariaLabel='Add'>
          <AddIcon />
        </ActionButton>
        </div>
      </div>
    )
  }
}

export default BookList
