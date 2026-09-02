import TextField from '@mui/material/TextField';

interface FieldProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Field = ({ value, onChange }: FieldProps) => {

    return (
        <TextField
            value={value}
            onChange={onChange}
            variant="outlined"
            size="small"
            autoComplete="off"
            placeholder="Enter the movie title"
            sx={{
                width: '40vw',
                '& .MuiOutlinedInput-root': {
                    backgroundColor: 'gray',
                    '& fieldset': {
                        borderColor: 'black',
                        boxShadow: 2,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'black',
                    },
                },
            }}
        />
    )
}

export default Field


