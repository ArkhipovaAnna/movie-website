import { useState, useEffect } from 'react';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import IconButton from '@mui/material/IconButton';

const ArrowDown = () => {

    const [isScrollBottom, setIsScrollBottom] = useState(false);

    useEffect(() => {

        const handleScrollBottom = () => {

            const scrollTop = window.scrollY || window.pageYOffset;

            if (scrollTop + window.innerHeight >= document.documentElement.scrollHeight - 15) {
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