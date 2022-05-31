import React from 'react'

// components
import CardBlog from './CardBlog'

// scss
import styles from "../blogStyles.module.scss";

const ContainerBlogView = () => {
    return (
        <div className={styles.container}>
            <h3 className={styles.titleComponet}>
                Related to this topic
            </h3>
            <div className={styles.divContent}>
                <CardBlog />
                <CardBlog />
                <CardBlog />
            </div>
        </div>
    )
}

export default ContainerBlogView