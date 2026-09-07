import Field from "../../shared/ui/Field/Field";
import Button from "../../shared/ui/Button/Button";
import styles from './SearchForm.module.scss';
import { useState } from 'react';

interface SearchFormProps {
    setQuery: (event: string) => void;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const SearchForm = ({ setQuery, setCurrentPage }: SearchFormProps) => {

    const [inputValue, setInputValue] = useState(() => {
        return sessionStorage.getItem('query') || '';
    });

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setQuery(inputValue);
        setCurrentPage(1);
        sessionStorage.setItem('currentPage', '1');
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
                type='submit'
                variant="contained"
            >
                Search</Button>
        </form>
    )
}

export default SearchForm