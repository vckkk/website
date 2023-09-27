import React, { useEffect, useRef } from 'react'
import { Player } from 'shikwasa'
import { useRouter } from 'next/router'
import Link from 'next/link'
import cls from 'classnames'

import styles from './index.module.scss'


interface Props {
  children: React.ReactElement
}
const Layout:React.FC<Props> = (props)=>{
  const playerRef = useRef(null)
  const {pathname} = useRouter()
  const hasBanner = ['/article'].indexOf(pathname) > -1
  
  return <div className={styles.layoutContainer}>
          {
          pathname !== '/' && 
            <div className={styles.headMenu}>
              <span><Link href="/">Home</Link></span>
              <span><Link href="/article">Article</Link></span>
              <span><Link href="/about">About</Link></span>
            </div>
          }
          <div className={cls(hasBanner ? styles.innerHasBanner : styles.innerNoBanner)}>
            {props.children}
          </div>
          <div className={styles.footer}>
            <a href="https://beian.miit.gov.cn">
              浙ICP备2023009994号
            </a>
            <div>Power By Next.js</div>
          </div>
          {/* <div id="player-container" className={styles.playerContainer} /> */}
        </div>
}

export default Layout
