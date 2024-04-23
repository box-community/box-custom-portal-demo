import {React,useEffect,useState} from "react";

import GlobalStyles from 'styles/GlobalStyles';
import { css } from "styled-components/macro"; //eslint-disable-line
import PrivateRoute from "PrivateRoute";

import FolderPage from './pages/folder'
import PreviewPage from './pages/preview'
import UploadPage from './pages/uploader'
import LandingPage from './pages/landingpage'
import LoginPage from "pages/login";
import LogoutPage from "pages/logout";


import {  BrowserRouter as Router,Route,Switch } from "react-router-dom";

export default function App() {
  // If you want to disable the animation just use the disabled `prop` like below on your page's component
  // return <AnimationRevealPage disabled>xxxxxxxxxx</AnimationRevealPage>;
  
  
    const [jsonData, setJsonData] = useState(null);
  
    const getJsonData = async () => {
      const response = await fetch('/config.json');
      const data = await response.json();
      sessionStorage.setItem('configData',JSON.stringify(data));
      return data;
    };
  
    useEffect(() => {
      getJsonData().then(data => {
        setJsonData(data);
      }); 
    }, []);
  
    if (jsonData === null) {
      return null;
    }
    
    const shouldLogin = sessionStorage.getItem('token')==null;
  return (
    <>
 
      <GlobalStyles />
      <Router  >
        <Switch>
        <PrivateRoute path="/index" >
              {shouldLogin?<LoginPage/>:<LandingPage/>}
          </PrivateRoute> 
        <Route path="/login" component={LoginPage} />
          <Route exact path="/" >
              {shouldLogin?<LoginPage/>:<LandingPage/>}
          </Route> 
          <PrivateRoute path="/PreviewPage" >
              {shouldLogin?<LoginPage/>:<PreviewPage/>}
          </PrivateRoute> 
          <PrivateRoute path="/UploaderPage" >
              {shouldLogin?<LoginPage/>:<UploadPage/>}
          </PrivateRoute>
          <PrivateRoute path="/FolderPage" >
              {shouldLogin?<LoginPage/>:<FolderPage/>}
          </PrivateRoute> 
          <PrivateRoute path="/LogoutPage" >
              {shouldLogin?<LoginPage/>:<LogoutPage/>}
          </PrivateRoute> 
          
        </Switch>
      </Router>
    </>
  );

}