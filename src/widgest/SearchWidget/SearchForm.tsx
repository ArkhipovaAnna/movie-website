import Field from "../../shared/ui/Field/Field";
import Button from "../../shared/ui/Button/Button";
import styles from './SearchForm.module.scss';
import { handleSetRequest } from "../../app/stores/use-request-store";
import { handleSetCurrentPage } from "../../app/stores/use-currentPage-store";
import { useSearchFormValue, handleSetSearchFormValue } from "../../app/stores/use-searchFormValue-store";
import { useNavigate } from "react-router";

const SearchForm = () => {

    const navigate = useNavigate();

    const setRequest = handleSetRequest();
    const setCurrentPage = handleSetCurrentPage();

    const searchFormValue = useSearchFormValue();
    const setSearchFormValue = handleSetSearchFormValue();

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate('/');
        setRequest(searchFormValue);
        setCurrentPage(1);
    };

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <Field
                value={searchFormValue}
                onChange={(event) => setSearchFormValue(event.target.value)} />
            <Button
                type='submit'
                variant="contained"
            >
                Search
            </Button>
        </form>
    )
}

export default SearchForm