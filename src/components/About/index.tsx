import React from 'react'
import styled from 'styled-components'

function About() {
  return (
    <AboutBox>
      <h1>Edit About component or pages/about.jsx to include your information.</h1>
    </AboutBox>
  )
}

export default About

// styles

const AboutBox = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  min-height: 300px;
`
