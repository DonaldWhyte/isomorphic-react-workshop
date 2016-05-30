import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav} from 'react-bootstrap';

// NOTE: Using <lI> directly instead of <NavItem> because the
// latter element does not place nicely with reactrouter's <Link>.

function AppNav() {
  return (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to={'/'}>Twitter Search App</Link>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <li><Link to={'/search'}>Search</Link></li>
      <li><Link to={'/about'}>About</Link></li>
    </Nav>
  </Navbar>
  );
}

export default class App extends React.Component {

  render() {
    return (
      <div id='app-container'>
        <AppNav />
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    );
  }

}
