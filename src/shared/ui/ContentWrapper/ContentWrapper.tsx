import styles from './ContentWrapper.module.scss';
import Loader from '../Loader/Loader';
import Fail from '../Fail/Fail';
import NotFound from '@/pages/NotFound/NotFound';
import ArrowUp from '../Arrows/ArrowUp';
import ArrowDown from '../Arrows/ArrowDown';

interface ContentWrapperProps {
    status: 'loading' | 'fail' | 'empty' | 'success';
    children: React.ReactNode;
}

const ContentWrapper = ({ status, children }: ContentWrapperProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {status === 'loading' && <Loader />}
                {status === 'fail' && <Fail />}
                {status === 'empty' && <NotFound />}
                {status === 'success' && children}
            </div>
            <div className={styles.arrows}>
                <ArrowUp />
                <ArrowDown />
            </div>
        </div>
    );
};

export default ContentWrapper