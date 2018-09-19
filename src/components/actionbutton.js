import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

class ActionButton extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    this.props.action(this.props.params)
  }

  render() {
    return (
      <IconButton onClick={this.handleClick} aria-label='Delete'>
        <DeleteIcon />
      </IconButton>
    )
  }
}

export default ActionButton
