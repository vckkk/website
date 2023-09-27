import Head from 'next/head'
import HomePage from '@/components/Home'
import MusicPlayer from '@/components/MusicPlay'
import { getAllArticles } from '@/utils'

export default function Home(props:any) {
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <HomePage articles={props.articles} tags={props.tags} />
      </div>
      <MusicPlayer/>
    </>
  )
}


export function getStaticProps(){
  const { articles, tags } =  getAllArticles(['slug','title','excerpt', 'date', 'display'], true)
  return {
      props:{
          articles,
          tags
      }
  }
}