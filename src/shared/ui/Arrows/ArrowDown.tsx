import { useState, useEffect } from 'react';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import IconButton from '@mui/material/IconButton';

const ArrowDown = () => {

    const [isScrollBottom, setIsScrollBottom] = useState(true);

    useEffect(() => {

        const handleScrollBottom = () => {

            const scrollTop = window.scrollY || window.pageYOffset;
            const scrollHeight = document.documentElement.scrollHeight;

            const hasVerticalScroll = scrollHeight > window.innerHeight;

            if (!hasVerticalScroll || (scrollTop + window.innerHeight >= scrollHeight - 15)) {
                setIsScrollBottom(true)
            } else {
                setIsScrollBottom(false)
            }
        }


        window.addEventListener('scroll', handleScrollBottom);

        handleScrollBottom();

        return () => window.removeEventListener('scroll', handleScrollBottom)

    }, []);


    return (
        <IconButton
            sx={{
                position: 'sticky',
                bottom: '1px',
                visibility: isScrollBottom ? 'hidden' : 'visible',
                '& svg': {
                    fill: 'gray'
                }
            }}
            onClick={() => window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth"
            })
            }
        >
            <KeyboardArrowDownSharpIcon fontSize='large' />
        </IconButton>

    )
}

export default ArrowDown