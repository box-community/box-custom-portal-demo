import React from "react";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";


import Hero from "pages/mainpage.js";


export default () => {
  return (
    <AnimationRevealPage>
      <Hero />
    </AnimationRevealPage>
  );
}
