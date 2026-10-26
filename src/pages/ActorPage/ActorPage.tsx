import { useParams } from "react-router";
import useSearchActor from "@/features/search/useSearchActor";
import ContentWrapper from "@/shared/ui/ContentWrapper/ContentWrapper";
import ActorView from "./ActorView";
import isValidIdHepler from "@/shared/helpers/isValidIdHelper";

const ActorPage = () => {

    const { id } = useParams();

    const isValidId = isValidIdHepler(id);

    const { data, isLoading, isError, error } = useSearchActor(isValidId ? Number(id) : 0);

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
            {data && <ActorView key={id} data={data} />}
        </ContentWrapper>
    )
}

export default ActorPage

