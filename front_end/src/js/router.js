//  TODO Add Routes to pages
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import QuoteShow from "./pages/LandingPage";
import NowPage from "./pages/Now";
import WorkPage from "./pages/Work";
import BlogPage from "./pages/Blog";
import BlogDetailPage from "./pages/Blog/BlogDetailPage";
import BlogEditPage from "./pages/Blog/BlogEditPage";
import RandomEditPage from "./pages/Random/RandomEditPge";
import EditForm from "./components/EditForm/EditForm";
import RandomEditForm from "./components/RandomEditForm";
import AboutPage from "./pages/About";
import LoginPage from "./pages/Auth";
import RandomPage from "./pages/Random";
import NavBar from "./components/NavBar";
import { connect } from "react-redux";
import {
  ContentContainer,
  GlobalStyle,
  RouterBackGroundContainer
} from "./components/Containers";
import { signIn } from "./actions";
import Random from "./pages/Random";

const _Routes = props => {
  if (localStorage.getItem("token") && !props.userEmail) {
    props.signIn();
  }
  return (
    <Router>
      <div>
        <RouterBackGroundContainer></RouterBackGroundContainer>
        <ContentContainer id="content-container">
          <GlobalStyle />
          <NavBar showOptions={props.userEmail} />
          <Switch>
            <Route exact path="/" component={QuoteShow} />
            <Route exact path="/now" component={NowPage} />
            <Route exact path="/blog" component={BlogPage} />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/work" component={WorkPage} />
            <Route exact path="/random" component={RandomPage} />
            <Route exact path="/repellomuggletum" component={LoginPage} />
            <Route exact path="/blog/:slug" component={BlogDetailPage} />
            <Route
              exact
              path="/blog/edit/new/"
              render={props => <EditForm {...props} new />}
            />
            <Route exact path="/blog/edit/:slug" component={BlogEditPage} />
            <Route
              exact
              path="/random/edit/new"
              render={props => <RandomEditForm {...props} new />}
            />
            <Route exact path="/random/edit/:id" component={RandomEditPage} />
          </Switch>
        </ContentContainer>
      </div>
    </Router>
  );
};

const mapStateToProps = state => {
  return {
    userEmail: state.auth.userEmail
  };
};
const Routes = connect(
  mapStateToProps,
  { signIn }
)(_Routes);

export default Routes;
