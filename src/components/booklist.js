import React from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const BookList = ({ heading, id, filter, books, children }) => (
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

export default BookList
