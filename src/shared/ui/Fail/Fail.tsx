import getErrorMessage from '@/shared/api/getErrorMessage';
import styles from './Fail.module.scss';

interface FailProps {
    error?: unknown;
}

const Fail = ({ error }: FailProps) => {

    const { title, hint } = getErrorMessage(error);

    return (
        <div className={styles.wrapper}>
            <p className={styles.text}>{title}<br />{hint}</p>
        </div>
    )
}

export default Fail
