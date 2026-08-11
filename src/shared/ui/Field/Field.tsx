import styles from './Field.module.scss';

interface FieldProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Field = (props: FieldProps) => {

    const { value, onChange } = props;

    return (
        <input
            className={styles.input}
            placeholder="Enter the movie title"
            value={value}
            onChange={onChange}
        />
    )
}

export default Field