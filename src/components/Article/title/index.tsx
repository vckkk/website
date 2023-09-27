import React,{ useEffect } from 'react'
import dayjs from 'dayjs'


import styles from './index.module.scss'


interface Props extends JSX.IntrinsicAttributes {
    title: string
    date: string
    description?: string
}

const Title:React.FC<Props>= ({title, date, description, ...rest}) => {

    return <div className={styles.title} {...rest} >
        <h1>{title}</h1>
        <div className={styles.date}>Posted by Vckkk on {dayjs(date).format("MMMM DD, YYYY")}</div>
    </div>
}

export default Title