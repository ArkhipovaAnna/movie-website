import useSearchStaff from "@/features/search/useSearchStaff";
import ActorCard from "@/shared/ui/ActorCard/ActorCard";
import { Link } from "react-router";
import styles from './Staff.module.scss';

interface StaffProps {
    id: number;
}

const Staff = ({ id }: StaffProps) => {

    const { data } = useSearchStaff(id);

    return (
        <div className={styles.wrapper}>
            <h4>В ролях:</h4>
            <ul className={styles.list}>
                {data?.map(person => (
                    <li key={person.staffId}>
                        <Link to={`/staff/${person.staffId}`} style={{ textDecoration: 'none' }}>
                            <ActorCard person={person} />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Staff