import React, { useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { getConfigValues } from "./helper";
import logo from "images/platform/logo.png";
import loadingGif from "images/platform/loader.gif";

const Container = tw(ContainerBase)`min-h-screen bg-blue-inc text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;
const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`bg-blue-inc mt-5 tracking-wide font-semibold bg-blue-inc text-gray-100 w-full py-4 rounded-lg hover:bg-blue-inc transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none `}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // If you use passwords for something else.
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      //the severless function could be edited or extended to take in specific scopes
      //using session storage is not secure. you will want to change this functionality for production
      const response = await fetch(`/api/getBoxToken?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      setToken(data.accessToken);
      sessionStorage.setItem('token', data.accessToken);
      //sessionStorage.setItem('token', encodeURIComponent(password));
      setLoading(false);
      // Redirect to your main platform page or wherever you use the token
      window.location.href = getConfigValues('globalSettings').landingPage;
    } catch (error) {
      console.error('Login Error:', error);
      setLoading(false);
      // Handle errors, e.g., show an alert or message on the UI
    }
  };

  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <LogoLink href="#">
              <LogoImage src={logo} />
            </LogoLink>
            <MainContent>
              <Heading>Sign In</Heading>
              <FormContainer>
                <Form onSubmit={handleSubmit}>
                  <Input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email} />
                  <Input type="password" placeholder="Developer Token If Using" onChange={e => setPassword(e.target.value)} value={password} />
                  <SubmitButton type="submit">
                    {loading ? <img src={loadingGif} width='24' height='24' alt='loading'/> : <LoginIcon className="icon" />}
                    <span className="text">Sign In</span>
                  </SubmitButton>
                  <span style={{ color: 'red', paddingTop: '20px', display: 'inline-block' }}> NOTE: This application is to demonstrate the art of the possible. It is not production ready, and full authentication has not been implemented. Please conduct your own architecture and security reviews before deploying code.</span>
                </Form>
              </FormContainer>
            </MainContent>
          </MainContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
};
