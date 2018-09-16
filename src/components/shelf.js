import React from 'react'
import PropTypes from 'prop-types'
import {Droppable} from 'react-beautiful-dnd'

const Shelf = ({children, id, title}) => (<Droppable droppableId={id}>
  {
    (provided, snapshot) => (<div ref={provided.innerRef} style={{
        display: 'flex',
        borderBottom: '3px solid white',
        marginBottom: '1.45rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        overflow: 'auto'
      }}>
      <h3>{title}</h3>
      <div>
        {provided.placeholder}
        {children}
      </div>
    </div>)
  }
</Droppable>)

export default Shelf
