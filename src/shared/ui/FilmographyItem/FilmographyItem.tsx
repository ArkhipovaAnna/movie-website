import useSearchDetails from "@/features/search/useSearchDetails";
import MoviePreview from "../MoviePreview/MoviePreview";

interface FilmographyItem {
    filmId: number;
}

const FilmographyItem = ({ filmId }: FilmographyItem) => {

    const { data, isLoading, isError } = useSearchDetails(filmId);

    if (isLoading) return <div>Загрузка...</div>
    if (isError) return <div>Ошибка загрузки</div>

    return (
        <MoviePreview movie={data} />
    )
}

export default FilmographyItem