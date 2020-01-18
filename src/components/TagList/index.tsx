import React, { Component } from 'react'
import { Link } from 'gatsby'

import kebabCase from 'lodash/kebabCase'

export interface TagListProps {
  tags: Array<string>
}

function TagList({ tags }: TagListProps) {
  return (
    <div className="post-tag-container">
      {tags &&
        tags.map(tag => (
          <Link key={tag} style={{ textDecoration: 'none' }} to={`/tags/${kebabCase(tag)}`}>
            <button type="button">{tag}</button>
          </Link>
        ))}
    </div>
  )
}

export default TagList
