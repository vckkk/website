import React from 'react'
import { getAllArticles } from '@/utils'
import ArticleOverview from '@/components/Article/overview'

import styles from './index.module.scss'



const AllArticles = (props:any) => {
    return (
        <div className={styles.allArticles}>
            <div className={styles.banner} style={{backgroundImage:'url("/images/banner3.jpg")',width:'100%', height: '480px'}}>
                <h1>Article</h1>
                <h3>「该拿什么拯救自己.」</h3>
            </div>
            <div className={styles.articleContainer}>
                {props.articles.map((item : any) => {
                    return (
                        <ArticleOverview {...item} />
                    )
                })}
            </div>

        </div>
    )
}
export function getStaticProps(){
    const articles =  getAllArticles(['slug','title','excerpt', 'date'])
    return {
        props:{
            articles 
        }
    }
}

export default AllArticles