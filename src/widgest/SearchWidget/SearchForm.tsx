import Field from "../../shared/ui/Field/Field";
import Button from "../../shared/ui/Button/Button";
import styles from './SearchForm.module.scss';
import { useState } from 'react';

interface SearchFormProps {
    setQuery: (event: string) => void;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const SearchForm = ({ setQuery, setPage }: SearchFormProps) => {

    const [inputValue, setInputValue] = useState(() => {
        return sessionStorage.getItem('query') || '';
    });

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setQuery(inputValue);
        setPage(1);
        sessionStorage.setItem('page', '1');
        sessionStorage.setItem('query', inputValue);
    }

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setQuery(inputValue);
        setPage(1);
        sessionStorage.setItem('page', '1');
        sessionStorage.setItem('query', inputValue);
    };

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <Field
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)} />
            <Button
                onClick={handleClick}
                variant="contained"
            >
                Search</Button>
        </form>
    )
}

export default SearchForm