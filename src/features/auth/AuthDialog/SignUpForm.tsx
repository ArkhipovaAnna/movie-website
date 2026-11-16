import { useState } from 'react';
import Alert from '@mui/material/Alert';
import MuiButton from '@mui/material/Button';
import Box from '@mui/material/Box';
import getAuthErrorMessage from '@/shared/api/getAuthErrorMessage';
import useSignUp from '../useSignUp';
import { NicknameTakenError } from '../errors';
import { SignUpSchema, getFieldErrors } from '../validation';
import AuthField from './AuthField';

const NICKNAME_HINT = 'От 3 до 20 символов: буквы, цифры, _ и -';

const SignUpForm = () => {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fieldErrors, setFieldErrors] = useState<Record<string, string | undefined>>({});

    const signUp = useSignUp();

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const result = SignUpSchema.safeParse({ nickname, email, password, confirmPassword });
        if (!result.success) {
            setFieldErrors(getFieldErrors(result.error));
            return;
        }

        setFieldErrors({});
        signUp.mutate({
            nickname: result.data.nickname,
            email: result.data.email,
            password: result.data.password,
        });
    };

    const isNicknameTaken = signUp.error instanceof NicknameTakenError;
    const nicknameError = fieldErrors.nickname ?? (isNicknameTaken ? 'Этот ник уже занят' : undefined);

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate>
            <AuthField
                label="Ник"
                name="nickname"
                value={nickname}
                onChange={setNickname}
                error={nicknameError}
                hint={NICKNAME_HINT}
                autoComplete="nickname"
                maxLength={20}
                autoFocus
            />
            <AuthField
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={setEmail}
                error={fieldErrors.email}
                autoComplete="email"
                maxLength={254}
            />
            <AuthField
                label="Пароль"
                name="password"
                type="password"
                value={password}
                onChange={setPassword}
                error={fieldErrors.password}
                hint="Не менее 8 символов"
                autoComplete="new-password"
                maxLength={72}
            />
            <AuthField
                label="Повторите пароль"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                error={fieldErrors.confirmPassword}
                autoComplete="new-password"
                maxLength={72}
            />

            {signUp.isError && !isNicknameTaken && (
                <Alert severity="error" sx={{ mt: 1 }}>
                    {getAuthErrorMessage(signUp.error)}
                </Alert>
            )}

            {signUp.data?.needsEmailConfirmation && (
                <Alert severity="success" sx={{ mt: 1 }}>
                    Мы отправили письмо со ссылкой для подтверждения. Проверьте почту.
                </Alert>
            )}

            <MuiButton
                type="submit"
                variant="contained"
                fullWidth
                disabled={signUp.isPending}
                sx={{ mt: 2 }}
            >
                {signUp.isPending ? 'Регистрируем…' : 'Зарегистрироваться'}
            </MuiButton>
        </Box>
    );
};

export default SignUpForm;
