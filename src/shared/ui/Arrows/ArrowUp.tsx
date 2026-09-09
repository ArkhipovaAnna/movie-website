import { useState, useEffect } from 'react';
import KeyboardArrowUpSharpIcon from '@mui/icons-material/KeyboardArrowUpSharp';
import IconButton from '@mui/material/IconButton';

const ArrowUp = () => {

    const [isScrollTop, setIsScrollTop] = useState(true);

    useEffect(() => {

        const handleScrollTop = () => {
            const scrollTop = window.scrollY || window.pageYOffset;
            setIsScrollTop(scrollTop <= 10);
        }

        window.addEventListener('scroll', handleScrollTop);

        handleScrollTop();

        return () => window.removeEventListener('scroll', handleScrollTop)

    }, []);

    return (
        <IconButton
            sx={{
                position: 'sticky',
                top: 1,
                visibility: isScrollTop ? 'hidden' : 'visible',
                '& svg': {
                    fill: 'gray'
                }
            }}
            onClick={() => window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
            }
        >
            <KeyboardArrowUpSharpIcon fontSize='large' />
        </IconButton >

    )
}

export default ArrowUp