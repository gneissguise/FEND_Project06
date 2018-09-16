import React from 'react'
import PropTypes from 'prop-types'
import { DragDropContext } from 'react-beautiful-dnd'

const onDragEnd = (result) => {
  // dropped outside the list
  if (!result.destination) {
    return;
  }

  // const items = reorder(
  //   this.state.items,
  //   result.source.index,
  //   result.destination.index
  // );
  //
  // this.setState({
  //   items,
  // });
}


const Bookshelf = ({ children }) => (
  <DragDropContext onDragEnd={onDragEnd}>
    {children}
  </DragDropContext>
)

export default Bookshelf
