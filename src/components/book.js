import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

class Book extends React.Component {
  constructor(props) {
    super(props)

    // this.handleAdd = this.handleAdd.bind(this)
    // this.handleDelete = this.handleDelete.bind(this)
  }

  handleAdd(e) {
    // this.props.addBook(this.props.book)
  }

  handleDelete(e) {
    // this.props.deleteBook(this.props.book)
  }

  render() {
    { provided, snapshot, book, index } = this.props

    return (
      <div className='book'
           ref={provided.innerRef}
           {...provided.draggableProps}
           {...provided.dragHandleProps}>
        <h4>{book.title}</h4>
        <p>index: {index}</p>
        <p>id: {book.id}</p>
        {/* <button onClick={this.handleDelete}>delete</button> */}
      </div>
    )
  }
}

export default Book
