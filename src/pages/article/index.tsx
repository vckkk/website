import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getAllArticles } from '@/utils'
import ArticleOverview from '@/components/Article/overview'

import styles from './index.module.scss'



const AllArticles = (props:any) => {
    const router = useRouter();
    const { tag } = router?.query || {}
    const [articlesList, setArticlesList] = useState(props.articles || [])

    const goToArticles = (key:string) => {
        router.push(`/article?tag=${key}`)
    }
    useEffect(()=>{
        if(tag) {
            setArticlesList(props.articles.filter((item:any) => {
                return item.tags.includes(tag) 
            } ))
        } else {
            setArticlesList(props.articles)
        }
    },[tag])
    return (
        <div className={styles.allArticles}>
            <div className={styles.banner} style={{backgroundImage:'url("/images/banner3.jpg")',width:'100%', height: '480px'}}>
                <h1>Article</h1>
                <h3>「.」</h3>
            </div>
            <div className={styles.articleContainer}>
                <div>
                <div className={styles.tag} onClick={()=> router.push('/article') }>All</div>
                {Object.keys(props.tags).map((i:any) => <div key={i} className={styles.tag} onClick={() => goToArticles(i)}>{i}<sup >{props.tags[i]}</sup></div>)}
                </div>
                {articlesList.map((item : any, index: number) => {
                    return (
                        <ArticleOverview {...item} key={index} />
                    )
                })}
            </div>

        </div>
    )
}
export function getStaticProps(e:any){
    const {articles, tags} =  getAllArticles(['slug','title','description', 'date'])
    return {
        props:{
            articles,
            tags
        }
    }
}

export default AllArticles