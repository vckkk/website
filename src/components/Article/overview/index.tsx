import React from "react";
import Link from "next/link";
import dayjs from "dayjs";

import styles from './index.module.scss'

const Overview = (props:any) => {
    return(
        <div className={styles.articleWrapper}>
            <Link href={`/article/${props.slug}`}>
                <div className={styles.title}>{props.title}</div>
                <div className={styles.content}>
                    {/* {props.excerpt} */}
                    {/* {props.excerpt} */}
                </div>
                <div className={styles.date}>{dayjs(props.date).format("MMMM DD, YYYY")}</div>
                <div className={styles.desc}>{props?.description}</div>
            </Link>
        </div>
    )
}

export default Overview