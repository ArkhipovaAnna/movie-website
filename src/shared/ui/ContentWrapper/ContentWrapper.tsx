import styles from './ContentWrapper.module.scss';
import Loader from '../Loader/Loader';
import Fail from '../Fail/Fail';

interface ContentWrapperProps {
    status: 'loading' | 'fail' | 'success';
    style?: React.CSSProperties;
    children: React.ReactNode;
}

const ContentWrapper = ({ status, style, children }: ContentWrapperProps) => {
    return (
        <div className={styles.container} style={style}>
            {status === 'loading' && <Loader />}
            {status === 'fail' && <Fail />}
            {status === 'success' && children}
        </div>
    );
};

export default ContentWrapper