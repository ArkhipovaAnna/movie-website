import Field from "../../shared/ui/Field/Field";
import Button from "../../shared/ui/Button/Button";
import styles from './SearchForm.module.scss';
import { useState } from 'react';

interface SearchFormProps {
    setQuery: (event: string) => void;
}

const SearchForm = ({ setQuery }: SearchFormProps) => {

    const [inputValue, setInputValue] = useState(() => {
        return sessionStorage.getItem('query') || '';
    });

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setQuery(inputValue);
        sessionStorage.setItem('query', inputValue);
    }

    return (
        <form className={styles.form}>
            <Field
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)} />
            <Button
                onClick={handleClick}
            >
                Search</Button>
        </form>
    )
}

export default SearchForm