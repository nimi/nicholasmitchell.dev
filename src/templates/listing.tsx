import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Layout from '../layout'
import PostList from '../components/PostList'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'

function PostListTemplate(props: any) {
  const postEdges = props.data.allMarkdownRemark.edges

  return (
    <Layout>
      <PostListBox>
        <div className="posts-container">
          <Helmet title={config.siteTitle} />
          <SEO />
          <PostsHeading>Nicholas' Blog</PostsHeading>
          <PostsLead>
            <p>
              Personal blog of <a href="https://twitter.com/nicklmitch">Nicholas Mitchell</a>
            </p>
            <p>Sometimes I share original ideas, other times I curate.</p>
          </PostsLead>
          <PostList items={postEdges} />
        </div>
      </PostListBox>
    </Layout>
  )
}

export default PostListTemplate

// data
export const listingQuery = graphql`
  query ListingQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(sort: { fields: [fields___date], order: DESC }, limit: $limit, skip: $skip) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
  }
`

// styles

const PostListBox = styled.div`
  min-height: 100%;
  min-width: 60%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const PostsHeading = styled.h1`
  font-size: 28px;
`

const PostsLead = styled.div`
  margin: 10px 0;
`
