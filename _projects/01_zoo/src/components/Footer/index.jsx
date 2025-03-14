import styles from './Footer.module.scss';

function Footer() {
    return (
        <footer className={styles.root}>
            <p>© {new Date().getFullYear()} Zoo</p>
        </footer>
    )
}

export default Footer;