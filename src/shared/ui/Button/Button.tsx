import MuiButton from '@mui/material/Button';

interface ButtonProps {
    children: string;
    type: 'submit' | 'reset' | 'button';
    variant?: 'text' | 'contained' | 'outlined';
    onClick?: () => void;
}
const Button = ({ children, type, variant, onClick }: ButtonProps) => {

    return (
        <MuiButton
            type={type}
            variant={variant}
            size="small"
            onClick={onClick}
            sx={{
                height: 'var(--control-height)',
                backgroundColor: 'gray',
                color: 'black',
            }}
        >
            {children}
        </MuiButton>
    );

}

export default Button