import Field from "../../shared/ui/Field/Field";
import Button from "../../shared/ui/Button/Button";
import { useState } from 'react';
import styles from './SearchForm.module.scss';

const SearchForm = () => {

    const [value, setValue] = useState('');

    return (
        <form className={styles.form}>
            <Field
                value={value}
                onChange={(event) => setValue(event.target.value)} />
            <Button>Search</Button>
        </form>
    )
}

export default SearchForm