

import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'


const Directory = join(process.cwd(), '_articles')

export function getArticleTitles() {
  return fs.readdirSync(Directory)
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(Directory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') { // md文件名
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}


export const getAllArticles = (fields: string[] = []) => {
  const articles = getArticleTitles()
  const which = articles
    .map((item) => getPostBySlug(item, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return which
}
