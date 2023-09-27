/* eslint-disable react/jsx-key */
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from './index.module.scss'
import Overview from '../Article/overview'
const HomePage = (props: any)=>{
  const router = useRouter();

  const goToArticles = (key:string) => {
    router.push(`/article?tag=${key}`)
  }
  return (
    <div>
      <div className={styles.banner}>
        <h1>
          Same Old .
        </h1>
        <div className={styles.radius}>
          <div className={styles.innerRadius} />
        </div>
      </div>
      <div className={styles.homeContainer}>
        <div className={styles.left}>
          {
            props.articles.map((i:any) => <Overview {...i} />)
          }
        </div>
        <div className={styles.right}>
          <div>
            <div style={{color:'#8c8c8c', marginBottom:'16px', paddingBottom:'8px' , borderBottom:'1px #f0f0f0 solid'}}>FEATURED TAG</div>
            <div className={styles.rightTop}>
              {Object.keys(props.tags).map((i:any) => <div className={styles.tag} onClick={() => goToArticles(i)}>{i}<sup >{props.tags[i]}</sup></div>)}
            </div>
          </div>
          <div>
            <div style={{ color:'#8c8c8c', margin:'16px 0',paddingBottom:'8px', borderBottom:'1px #f0f0f0 solid' }}>ABOUT ME</div>
            <div className={styles.rightBottom}>
              <Image  src='/cover.jpeg' width={180} height={180} alt='tx' style={{borderRadius: '8px'}} />
              <div style={{color:'#8c8c8c', fontSize:'14px'}}>
                <div>前端 @ 涂鸦智能</div>
                <br/>
                <div>
                  半浪漫主义半唯物辩证主义者
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HomePage;

