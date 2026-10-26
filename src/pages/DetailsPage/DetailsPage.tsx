import { useParams } from "react-router";
import useSearchDetails from "@/features/search/useSearchDetails";
import ContentWrapper from "@/shared/ui/ContentWrapper/ContentWrapper";
import DetailsView from "./DetailsView";
import isValidIdHepler from "@/shared/helpers/isValidIdHelper";


const DetailsPage = () => {

    const { id } = useParams();

    const isValidId = isValidIdHepler(id);

    const { data, isLoading, isError, error } = useSearchDetails(isValidId ? Number(id) : 0);

    if (!isValidId) {
        return (
            <ContentWrapper status={'empty'}>
                <></>
            </ContentWrapper>
        )
    }

    const status =
        isLoading ? 'loading' :
            isError ? 'fail' :
                'success';

    return (
        <ContentWrapper status={status} error={error}>
            {data && <DetailsView data={data} />}
        </ContentWrapper>
    )
}

export default DetailsPage