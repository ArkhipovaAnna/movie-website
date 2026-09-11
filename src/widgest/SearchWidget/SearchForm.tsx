import Field from "../../shared/ui/Field/Field";
import Button from "../../shared/ui/Button/Button";
import styles from './SearchForm.module.scss';
import { useState } from 'react';
import { handleSetRequest } from "../../app/stores/use-request-store";
import { handleSetCurrentPage } from "../../app/stores/use-currentPage-store";


const SearchForm = () => {

    const setRequest = handleSetRequest();
    const setCurrentPage = handleSetCurrentPage();

    const [inputValue, setInputValue] = useState(() => {
        return sessionStorage.getItem('query') || '';
    });

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setRequest(inputValue);
        setCurrentPage(1);
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