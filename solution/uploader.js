import React from "react";
import ContentUploader from 'box-ui-elements/es/elements/content-uploader';
import { IntlProvider } from "react-intl";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "pages/header.js";
import styled from "styled-components";
import imageSrc from "images/reliable-icon.svg";
import { getConfigValues } from "./helper"




const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24 items-center `;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-1/6 flex-shrink-0 relative`;
const Image = tw.img`max-w-full w-96 rounded-t sm:rounded relative z-20`;

const TextColumn = styled(Column)(props => [
  tw`md:w-5/6 mt-16 md:mt-0 h-128`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);
//using session storage is not secure. you will want to change this functionality for production
const token = sessionStorage.getItem('token');
export default () => {
  //storing variables in the front end is not secure. you will want to grab this value from a database for production
  let folderID = process.env.REACT_APP_BOX_UPLOADER_FOLDER_ID

  return (
    <AnimationRevealPage>
      <Header />
      <TwoColumn>
      <TextColumn >
          <IntlProvider locale="en">

            <ContentUploader 
                language='en-US'
                token={token}
                rootFolderId={folderID}
              
           />
          </IntlProvider>
        </TextColumn>
        <ImageColumn>
            
                <Image src={imageSrc} />
            
          
        </ImageColumn>
       
      </TwoColumn>
    
      
    </AnimationRevealPage>
  );
};
