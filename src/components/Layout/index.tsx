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
  
  
  // useEffect(()=>{
  //   playerRef.current = new Player({
  //     container:()=>document.getElementById('player-container'),
  //     audio:{
  //       title:"xxxx",
  //       src:"http://m801.music.126.net/20230131115325/c1d7000618679b23a17439fe75d109e8/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/24210385871/5d64/045e/9f23/880eb327ce53e13091d8d5a74fd3c97d.mp3",
  //       artist:'dsa'
  //     },
  //     theme:'light',
  //     fixed:{
  //       type:'fixed',
  //       position:'bottom'
  //     }
  //   })
  // },[])

  return <div className={styles.layoutContainer}>
          {pathname !== '/' && 
            <div className={styles.headMenu}>
              <span><Link href="/">Home</Link></span>
              <span><Link href="/article">Article</Link></span>
              <span><Link href="/about">About</Link></span>
            </div>
          }
          <div className={cls(hasBanner ? styles.innerHasBanner : styles.innerNoBanner)}>
            {props.children}
          </div>

          {/* <div id="player-container" className={styles.playerContainer} /> */}
        </div>
}

export default Layout