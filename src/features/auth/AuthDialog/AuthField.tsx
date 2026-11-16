import TextField from '@mui/material/TextField';

interface AuthFieldProps {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'password';
    value: string;
    onChange: (value: string) => void;
    error?: string;
    hint?: string;
    autoComplete: string;
    maxLength: number;
    autoFocus?: boolean;
}

const AuthField = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    error,
    hint,
    autoComplete,
    maxLength,
    autoFocus,
}: AuthFieldProps) => {
    return (
        <TextField
            label={label}
            name={name}
            type={type}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            error={Boolean(error)}
            helperText={error ?? hint}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            fullWidth
            margin="dense"
            size="small"
            slotProps={{ htmlInput: { maxLength } }}
        />
    );
};

export default AuthField;
