import MuiButton from '@mui/material/Button';

interface ButtonProps {
    children: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: 'text' | 'contained' | 'outlined';
}
const Button = ({ children, variant, onClick }: ButtonProps) => {

    return (
        <MuiButton
            onClick={onClick}
            variant={variant}
            size="small"
            sx={{
                backgroundColor: 'gray',
                color: 'black',
            }}
        >
            {children}
        </MuiButton>
    );

}

export default Button