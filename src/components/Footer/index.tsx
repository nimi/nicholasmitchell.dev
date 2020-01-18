import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

export interface FooterProps {
  config: any
}

function Footer(props: FooterProps) {
  const { config } = props
  const url = config.siteRss
  const { copyright } = config
  if (!copyright) {
    return null
  }
  return (
    <FooterContainer>
      <div className="notice-container">
        <h4>{copyright}</h4>

        <Link to={url}>
          <button>Subscribe</button>
        </Link>
      </div>
    </FooterContainer>
  )
}

export default Footer

// styles
const FooterContainer = styled.footer`
  justify-content: center;
  align-content: center;
  padding: 10px 5px 5px;

  .notice-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    margin-top: 25px;
  }

  @media (max-width: 640px - 1px) {
    .notice-container {
      justify-content: space-around;
    }
  }

  .notice-container h4 {
    text-align: center;
    margin: 0;
  }
`
