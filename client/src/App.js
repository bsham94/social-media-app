import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PostDetails from './PostDetails/postdetails'
import Home from './components/home/home';
import Navbar from './components/navbar/navbar';
import Auth from './components/auth/auth';
import { GoogleOAuthProvider } from '@react-oauth/google';
const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))

  return(
  <GoogleOAuthProvider clientId='455922499869-pa80e1o5ehedplvch5cdbinv091eren3.apps.googleusercontent.com'>
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar />
          <Switch>
            <Route path="/" exact component={()=>{
              return (<Redirect to='/posts'/>)
            }} />
            <Route path='/posts' exact component={Home} />
            <Route path='/posts/search' exact component={Home} />
            <Route path='/posts/:id' component={PostDetails}/>
            <Route path="/auth" exact component={() =>{
              return (!user ? <Auth/> :<Redirect to="./posts"/>)
            }} />
          </Switch>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  ) 
};

export default App;