import MuiButton from '@mui/material/Button';

interface ButtonProps {
    children: string;
    type: 'submit' | 'reset' | 'button';
    variant?: 'text' | 'contained' | 'outlined';
}
const Button = ({ children, type, variant }: ButtonProps) => {

    return (
        <MuiButton
            type={type}
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