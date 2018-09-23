import React from 'react'
import IconButton from '@material-ui/core/IconButton'

class ActionButton extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = (e) => this.props.action(this.props.params)

  render() {
    return (
      <IconButton onClick={this.handleClick} aria-label={this.props.ariaLabel}>
        {this.props.children}
      </IconButton>
    )
  }
}

export default ActionButton
