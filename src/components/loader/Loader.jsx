
import styles from './style.module.css';

const Loader = ({ loaderStyle, width = '2.8em' }) => {
    return (
        <div style={loaderStyle}>
            <svg style={{ width: width }} className={styles.svg} viewBox="25 25 50 50">
                <circle className={styles.circle} r="20" cy="50" cx="50"></circle>
            </svg>
        </div>
    )
}

export default Loader;