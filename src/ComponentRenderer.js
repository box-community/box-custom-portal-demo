import React from 'react';
import { useParams } from 'react-router-dom';


import PlatformDemoLandingPage from "pages/landingpage.js"
import PlatformDemoPageImageSrc from "images/demo/EventLandingPage.jpeg";

import UploaderPage from "pages/uploader.js";
import PreviewPage from "pages/preview.js";
import FolderPage from "pages/folder.js";
import LoginPage from "pages/login.js";
import LogoutPage from "pages/logout.js";

import LoginPageImageSrc from "images/demo/LoginPage.jpeg";
import ContactUsPageImageSrc from "images/demo/ContactUsPage.jpeg";



export const components = {
  landingPages: {
    PlatformDemoLandingPage: {
      component: PlatformDemoLandingPage,
      imageSrc: PlatformDemoPageImageSrc,
      url: "/pages/landingPage",
    }
  },

  innerPages: {
    FolderPage: {
      component: FolderPage,
      url: `/pages/FolderPage`,
      imageSrc: ContactUsPageImageSrc,
    },
    PreviewPage: {
      component: PreviewPage,
      url: `/pages/PreviewPage`,
      imageSrc: ContactUsPageImageSrc,
    },
    UploaderPage: {
      component: UploaderPage,
      url: `/pages/UploaderPage`,
      imageSrc: ContactUsPageImageSrc,
    },

    LogoutPage: {
      component: LogoutPage,
      imageSrc: LoginPageImageSrc,
      scrollAnimationDisabled: true,
      url: "/pages/LogoutPage",
    },
    LoginPage: {
      component: LoginPage,
      imageSrc: LoginPageImageSrc,
      scrollAnimationDisabled: true,
      url: "/pages/LoginPage",
    }
  },

  
}

export default (props) => {
  console.log('render:' + JSON.stringify(props));
  let { type, subtype, name } = useParams();
  console.log(useParams());
  let Component = null;
  let jsonData = props.data.jsonData;
  if(sessionStorage.getItem('token')==null) {
      Component= components['innerPages']['LoginPage'].component
    return <Component />
  }
  else if(name=='LogoutPage') {
  
    Component= components['innerPages']['LogoutPage'].component
    return <Component jsonData={{jsonData}}/>
  }
  try {
    
      Component= components[type][name].component

    if(Component)
      return <Component jsonData={{jsonData}}/>

    throw new Error("Component Not Found")
  }
  catch (e) {
    console.log(e)
    return <div>Error: Component Not Found</div>
  }
}
