import Button from '@/shared/ui/Button/Button';
import styles from './ErrorFallback.module.scss';

interface ErrorFallbackProps {
    onRetry: () => void;
}

const ErrorFallback = ({ onRetry }: ErrorFallbackProps) => {
    return (
        <div className={styles.wrapper} role="alert">
            <p className={styles.text}>Произошла ошибка.<br />Попробуйте ещё раз.</p>
            <Button type="button" variant="contained" onClick={onRetry}>
                Попробовать снова
            </Button>
        </div>
    )
}

export default ErrorFallback
