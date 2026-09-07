import { useState, useEffect } from 'react';
import KeyboardArrowUpSharpIcon from '@mui/icons-material/KeyboardArrowUpSharp';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import IconButton from '@mui/material/IconButton';

export const ArrowUp = () => {

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

export const ArrowDown = () => {

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