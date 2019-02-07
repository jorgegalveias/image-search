
import React, { Component } from 'react';
import classNames from 'classnames';

import styles from './ImageCard.module.scss';

class ImageCard extends Component {
    render() {
        const { image } = this.props;
        const date = new Date(image.updated_at)

        return (
            <div className={classNames(styles.imageCard, this.props.className)}>
                <div className={styles.image}>
                    <img src={image.urls.small} alt={image.description} />
                </div>
                <div className={styles.meta}>
                    <div>
                        <img src={image.user.profile_image.small} alt={image.user.name} className={styles.userPhoto} />
                    </div>
                    <p className={styles.credits}>
                        <span>Photo by&nbsp;</span>
                        <a href={image.user.portfolio_url} rel='noopener noreferrer' target='_blank'>{image.user.name}</a>
                        <span>&nbsp;on&nbsp;</span>
                        <a href='https://unsplash.com/' rel='noopener noreferrer' target='_blank'>Unsplash</a>
                    </p>
                </div>
                {date && <div className={styles.date}>{date.toDateString()}</div>}
            </div>
        );
    }
}

export default ImageCard;