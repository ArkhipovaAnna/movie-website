import { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import MuiButton from '@mui/material/Button';
import { useAuthStatus } from '@/app/stores/use-auth-store';
import {
    getAuthDialogActions,
    useAuthDialogMode,
    useAuthDialogOpen,
} from '@/app/stores/use-auth-dialog-store';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const AuthDialog = () => {
    const isOpen = useAuthDialogOpen();
    const mode = useAuthDialogMode();
    const status = useAuthStatus();

    // Как только человек вошёл (после входа или регистрации), окно закрывается само.
    useEffect(() => {
        if (status === 'authed' && isOpen) {
            getAuthDialogActions().close();
        }
    }, [status, isOpen]);

    const isSignIn = mode === 'signIn';

    return (
        <Dialog
            open={isOpen}
            onClose={() => getAuthDialogActions().close()}
            fullWidth
            maxWidth="xs"
            aria-labelledby="auth-dialog-title"
        >
            <DialogTitle id="auth-dialog-title">
                {isSignIn ? 'Вход' : 'Регистрация'}
            </DialogTitle>

            <DialogContent>
                {isSignIn ? <SignInForm /> : <SignUpForm />}
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
                <MuiButton
                    size="small"
                    onClick={() => getAuthDialogActions().setMode(isSignIn ? 'signUp' : 'signIn')}
                >
                    {isSignIn ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
                </MuiButton>
            </DialogActions>
        </Dialog>
    );
};

export default AuthDialog;
