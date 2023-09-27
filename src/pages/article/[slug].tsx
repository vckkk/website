import React from 'react'
import { getAllArticles, getPostBySlug } from '@/utils/index'

import Content from '@/components/Article/content'
import Title from '@/components/Article/title'

import styles from './index.module.scss'

interface Props {
  post:any
}
const Article = (props:Props) => {
  return (
    <div className={styles.article}>
      <Title title={props.post.title} date={props.post.date} />
      <Content  md={props.post.content} />
    </div>
  )
}

export async function getStaticProps({ params }:any) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])

  return {
    props: {
      post: {
        ...post,
      },
    },
  }
}
/**先执行这里 */
export async function getStaticPaths() {
  const {articles} = getAllArticles(['slug'])

  return {
    paths: articles.map((item) => {
      return {
        params: {
          slug: item?.slug,
        },
      }
    }),

    fallback: false,
  }
}

export default Article