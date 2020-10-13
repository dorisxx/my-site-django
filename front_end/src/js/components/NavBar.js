import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, Dropdown } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { COLORS, SIZES } from "../constants";

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
        margin-right: 3%;
        padding-left: 0;
      }
      .navbar .navbar-brand a {
        text-decoration : none;
        font-size: ${SIZES.brand};
        color: ${COLORS.text};
        font-weight: bold;
      }
      .navbar .navbar-brand a:hover{
        color: ${COLORS.text};
        border: none;
        background-color: transparent;
        text-shadow: 0px 0px 15px ${COLORS.background}, 0px 0px 15px ${COLORS.background}, 0px 0px 15px ${COLORS.shadow};      }
      .navbar-light .navbar-nav .nav-NavLink {
        color: ${COLORS.text};
        padding: 1.5vw;
        font-size: ${SIZES.nav};
      }
      .navbar-light .navbar-nav .nav-NavLink.active,
      .navbar-light .navbar-nav .nav-NavLink:hover {
        text-shadow: 0px 0px 15px ${COLORS.background}, 0px 0px 15px ${COLORS.background}, 0px 0px 15px ${COLORS.shadow};
        border: none;
        text-decoration: none;
        background-color: transparent;
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
      <Navbar expand="lg" variant="light">
        <Navbar.Brand>
          <NavLink to="/">dorisxx</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" defaultActiveKey="/about">
            <NavLink
              to="/work"
              role="tab"
              className="nav-NavLink"
              tabIndex="-1"
            >
              work
            </NavLink>
            <NavLink
              to="/blog"
              role="tab"
              className="nav-NavLink"
              tabIndex="-1"
            >
              blog
            </NavLink>
            {/* <NavLink to="/now" role="tab" className="nav-NavLink" tabIndex="-1">
              now
            </NavLink> */}
            <NavLink
              to="/about"
              role="tab"
              className="nav-NavLink"
              tabIndex="-1"
            >
              about
            </NavLink>
            {/* <NavLink
              to="/random"
              role="tab"
              className="nav-NavLink"
              tabIndex="-1"
            >
              Random
            </NavLink> */}
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
