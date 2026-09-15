import { DotLoader } from "react-spinners";
import styles from './Loader.module.scss';

const Loader = () => {
    return (
        <div className={styles.loader}>
            <DotLoader size={90} color="#fdd510" />
        </div>
    )
}

export default Loader