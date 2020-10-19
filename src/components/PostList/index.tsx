import React from 'react'
import { Link } from 'gatsby'

interface PostDataNode {
  node: any
}

interface PostListProps {
  items: Array<PostDataNode>
}

function PostList(props: PostListProps) {
  const postList = props.items.map(({ node }) => ({
    path: node.fields.slug,
    tags: node.frontmatter.tags,
    cover: node.frontmatter.cover,
    title: node.frontmatter.title,
    date: node.fields.date,
    excerpt: node.excerpt,
    timeToRead: node.timeToRead,
  }))
  return (
    <div>
      {/* Your post list here. */
      postList.map(post => (
        <Link to={post.path} key={post.title}>
          <h3>{post.title}</h3>
        </Link>
      ))}
    </div>
  )
}

export default PostList
