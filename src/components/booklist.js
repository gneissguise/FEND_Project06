import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import { Star, StarBorder } from '@material-ui/icons'
import Rating from 'react-rating'

import ActionButton from './actionbutton'

class BookList extends React.Component {
  constructor(props) {
    super(props)

    console.log(props)
  }

  render() {
    const { heading, id, filter, books, addBook, deleteBook, children } = this.props

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
                        <h4>{book.title}</h4>
                        <Rating onChange={(rate) => alert(rate)}
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
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="add-button-container">
        <ActionButton action={addBook}
                      params=""
                      ariaLabel='Add'>
          <AddIcon />
        </ActionButton>
        </div>
      </div>
    )
  }
}

export default BookList
