import React,{useState,useContext} from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/auth'
export default function MenuBar() {
    const {logout,user} = useContext(AuthContext)
    const pathName = window.location.pathname;
    const path = pathName === '/' ? 'home' : pathName.substr(1)
const [activeItem,setActiveItem] = useState(path)
  const handleItemClick = (e, { name }) => setActiveItem(name)

    const menuBar = user ? (
      <div style={{marginBottom:10}}>
        <Menu pointing secondary size='massive' color='teal'>
          <Menu.Item
            name={user.username}
            active={true}
            as={Link}
            to='/'
          />
          <Menu.Menu position='right'>
          <Menu.Item
            name='logout'
            onClick={logout}
          />
          </Menu.Menu>
        </Menu>

      </div>
    ) : ( <div>
        <Menu pointing secondary size='massive' color='teal'>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick} 
            as={Link}
            to='/'
          />
         
         
          <Menu.Menu position='right'>
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to='/login'
          />
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as={Link}
            to='/register'
            />
          </Menu.Menu>
        </Menu>

      </div>)

      return menuBar
  }