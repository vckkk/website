import 'shikwasa/dist/style.css'
import { Player } from 'shikwasa'
import { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss';

const MusicPlayer = () => {
  const player = useRef<any>(null);
  const [isPlayed, setIsPlayed] = useState(false)
  useEffect(()=>{
    if(player.current) return
    player.current = new Player({
      container: () => document.querySelector('.element-of-your-choice'),
      audio: {
        title: 'Hello World!',
        artist: 'Shikwasa FM',
        cover: 'image.png',
        position: 'bottom',
        src: 'https://blog-1307704681.cos.ap-shanghai.myqcloud.com/%E4%BD%A0%E6%80%8E%E4%B9%88%E8%BF%9E%E8%AF%9D%E9%83%BD%E8%AF%B4%E4%B8%8D%E6%B8%85%E6%A5%9A.mp4',
      },
    })
  })

  const onPlay = () =>{
    player.current?.toggle();
    setIsPlayed(!isPlayed)
  }

  return (
    <div className={styles.player}>
      <div className='element-of-your-choice'></div>
      <div onClick={onPlay}>
        {isPlayed ? ' 🎵 你怎么连话都说不清楚' : '🎁'}
      </div>
    </div>
  )
}

export default MusicPlayer;