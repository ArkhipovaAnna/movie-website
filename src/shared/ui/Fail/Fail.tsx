import styles from './Fail.module.scss';

const Fail = () => {
    return (
        <div className={styles.wrapper}>
            <p>Что-то пошло не так.<br />Повторите попытку позже.</p>
        </div>
    )
}

export default Fail