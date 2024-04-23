import React, { useRef, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { getConfigValues } from "./helper";

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const Button = tw.button`px-8 py-4 mt-8 font-bold text-white bg-blue-inc rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out`;

function logoutuser() {
  sessionStorage.clear(); // Simplified to clear all session storage
}

export default ({
  headingText = "You have been signed out of Box Platform",
}) => {

  useEffect(() => {
    console.log('Logged out');
    logoutuser();
  }, [])

  const handleBackHome = () => {
    const defaultLandingPage = '/index';
    const landingPage = getConfigValues('globalSettings')?.landingPage || defaultLandingPage;
    window.location.href = landingPage;
  }

  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <MainContent>
              <Heading>{headingText}</Heading>
              <FormContainer>
                <Button onClick={handleBackHome}>Go back to home page</Button>
              </FormContainer>
            </MainContent>
          </MainContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
};
