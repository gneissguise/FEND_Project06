import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

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
                        <p>index: {index}</p>
                        <p>id: {book.id}</p>
                        <ActionButton
                          action={deleteBook}
                          params={book}>
                          delete
                        </ActionButton>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    )
  }
}

export default BookList
