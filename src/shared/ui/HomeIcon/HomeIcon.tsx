import MuiSvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';
import IconButton from '@mui/material/IconButton';
import { handleSetRequest } from '@/app/stores/use-request-store';
import { handleSetCurrentPage } from '@/app/stores/use-currentPage-store';
import { handleSetSearchFormValue } from '@/app/stores/use-searchFormValue-store';
import { Link } from 'react-router';

const SvgIcon = (props: SvgIconProps) => {
    return (
        <MuiSvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </MuiSvgIcon>
    );
}

const HomeIcon = () => {

    const setRequest = handleSetRequest();
    const setCurrentPage = handleSetCurrentPage();
    const setSearchFormValue = handleSetSearchFormValue();

    return (
        <IconButton
            sx={{
                position: 'fixed',
                top: 20,
                left: 20,
            }}
            onClick={() => {
                setRequest('')
                setCurrentPage(1)
                setSearchFormValue('')
            }}
        >
            <Link to={'/'}>
                <SvgIcon
                    fontSize="large"
                    sx={{ color: '#eceff1' }}
                />
            </Link>
        </IconButton>
    );
}

export default HomeIcon
