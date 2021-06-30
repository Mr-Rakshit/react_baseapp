import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import "./Sticky.css"
import zIndex from '@material-ui/core/styles/zIndex'

export default class MenuExampleInverted extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu className="Sticky" color="blue" style={{zIndex:1}}
      inverted>
        <Link to="/" >
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        />
        </Link>
        <Link to="/signin" >
        <Menu.Item
          name='SignIn'
          active={activeItem === 'messages'}
          onClick={this.handleItemClick}
        />
        </Link>
        <Link to="/signup" >
        <Menu.Item
          name='SignUp'
          active={activeItem === 'messages'}
          onClick={this.handleItemClick}
        />
        </Link>
        <Link to="/" >
        <Menu.Item
          name='DashBoard_Asso'
          active={activeItem === 'messages'}
          onClick={this.handleItemClick}
        />
        </Link>
        <Link to="/" >
        <Menu.Item
          name='DashBoard_PeerStd'
          active={activeItem === 'messages'}
          onClick={this.handleItemClick}
        />
        </Link>
        <Link to="/displaycont" >
        <Menu.Item
          name='Display'
          active={activeItem === 'messages'}
          onClick={this.handleItemClick}
        />
        </Link>
      </Menu>
    )
  }
}