import { useState } from 'react';
import Alert from '@mui/material/Alert';
import MuiButton from '@mui/material/Button';
import Box from '@mui/material/Box';
import getAuthErrorMessage from '@/shared/api/getAuthErrorMessage';
import useSignIn from '../useSignIn';
import { SignInSchema, getFieldErrors } from '../validation';
import AuthField from './AuthField';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fieldErrors, setFieldErrors] = useState<Record<string, string | undefined>>({});

    const signIn = useSignIn();

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const result = SignInSchema.safeParse({ email, password });
        if (!result.success) {
            setFieldErrors(getFieldErrors(result.error));
            return;
        }

        setFieldErrors({});
        signIn.mutate(result.data);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate>
            <AuthField
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={setEmail}
                error={fieldErrors.email}
                autoComplete="username"
                maxLength={254}
                autoFocus
            />
            <AuthField
                label="Пароль"
                name="password"
                type="password"
                value={password}
                onChange={setPassword}
                error={fieldErrors.password}
                autoComplete="current-password"
                maxLength={72}
            />

            {signIn.isError && (
                <Alert severity="error" sx={{ mt: 1 }}>
                    {getAuthErrorMessage(signIn.error)}
                </Alert>
            )}

            <MuiButton
                type="submit"
                variant="contained"
                fullWidth
                disabled={signIn.isPending}
                sx={{ mt: 2 }}
            >
                {signIn.isPending ? 'Входим…' : 'Войти'}
            </MuiButton>
        </Box>
    );
};

export default SignInForm;
