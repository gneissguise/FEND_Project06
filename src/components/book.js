import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

const Book = (book) => (<Draggable key={book.title} draggableId={book.title} index={book.id} style={{
    display: 'flex'
  }}>
  {
    (provided, snapshot) => (<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{
        background: 'url(https://about.canva.com/wp-content/uploads/sites/3/2015/01/children_bookcover.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundColor: 'white',
        color: '#45484d',
        cursor: 'pointer',
        height: '6rem',
        width: '4rem',
        marginLeft: '0.7rem',
        marginRight: '0.7rem',
        userSelect: 'none',
        ...provided.draggableProps.style
      }}></div>)
  }
</Draggable>)

export default Book
