import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, Dropdown } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const NavBar = props => {
  const Logout = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      location.reload();
    }
  };

  return (
    <>
      <style type="text/css">
        {`
      .navbar {
        background: None;
        width: 90%;
        margin-left: 5%;
      }
      .navbar .navbar-brand a {
        text-decoration : none;
        font-size: 1.4rem;
      }
      .navbar .navbar-brand a:hover{
        color: white;
        border: none;
        background-color: transparent;
        text-shadow: 0px 0px 15px white, 0px 0px 15px white, 0px 0px 15px white;
      }
      .navbar-dark .navbar-nav .nav-NavLink {
        color: white;
        padding: 1.5vw;
        font-size: 1.1rem;
      }
      .navbar-dark .navbar-nav .nav-NavLink.active,
      .navbar-dark .navbar-nav .nav-NavLink:hover {
        color: white;
        border: none;
        text-decoration: none;
        background-color: transparent;
        text-shadow: 0px 0px 15px white, 0px 0px 15px white, 0px 0px 15px white;
      } 
      .dropdown{
        margin: auto;
      }
      .dropdown a {
        color: black;
      }
      .dropdown-menu {
        padding:0;
      }
      .dropdown-item {
        padding:0.25rem 0.5rem;
      }
      `}
      </style>
      <Navbar expand="lg" variant="dark">
        <Navbar.Brand>
          <NavLink to="/">Doris Xiang</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" defaultActiveKey="/about">
            <NavLink
              to="/about"
              role="tab"
              className="nav-NavLink"
              tabIndex="-1"
            >
              About
            </NavLink>
            <NavLink
              to="/work"
              role="tab"
              className="nav-NavLink"
              tabIndex="-1"
            >
              Work
            </NavLink>
            <NavLink
              to="/blog"
              role="tab"
              className="nav-NavLink"
              tabIndex="-1"
            >
              Blog
            </NavLink>
            <NavLink to="/now" role="tab" className="nav-NavLink" tabIndex="-1">
              Now
            </NavLink>
            <NavLink
              to="/random"
              role="tab"
              className="nav-NavLink"
              tabIndex="-1"
            >
              Random
            </NavLink>
            {props.showOptions && (
              <Dropdown>
                <Dropdown.Toggle variant="danger" id="dropdown-basic" size="sm">
                  Options
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/blog/edit/new">
                    New Blog Post
                  </Dropdown.Item>
                  <Dropdown.Item href="/random/edit/new">
                    New Random POST
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#"
                    onClick={e => {
                      Logout(e);
                    }}
                  >
                    Log out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default withRouter(NavBar);
