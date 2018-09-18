import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const Book = (provided, snapshot, book, index) => (
  <div className='book'
       ref={provided.innerRef}
       {...provided.draggableProps}
       {...provided.dragHandleProps}>
       {console.log(book)}
    <h4>{book.title}</h4>
    <p>index: {index}</p>
    <p>id: {book.id}</p>
  </div>
)

export default Book
