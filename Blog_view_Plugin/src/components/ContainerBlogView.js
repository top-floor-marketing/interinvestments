import React from 'react'

// components
import CardBlog from './CardBlog'

// scss
import styles from "../blogStyles.module.scss";

const ContainerBlogView = () => {
    return (
        <div className={styles.container}>
            <div className={styles.divContent}>
                <CardBlog />
                <CardBlog />
                <CardBlog />
            </div>
        </div>
    )
}

export default ContainerBlogView