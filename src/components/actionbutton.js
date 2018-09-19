import React from 'react'

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
      <button onClick={this.handleClick}>{this.props.children}</button>
    )
  }
}

export default ActionButton
