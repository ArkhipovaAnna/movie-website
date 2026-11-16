import type { ReactNode } from 'react';
import { useAuthStatus } from '@/app/stores/use-auth-store';
import { getAuthDialogActions } from '@/app/stores/use-auth-dialog-store';
import Loader from '@/shared/ui/Loader/Loader';
import Button from '@/shared/ui/Button/Button';
import styles from './RequireAuth.module.scss';

interface RequireAuthProps {
    children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
    const status = useAuthStatus();

    // Сохранённый вход ещё проверяется: не показываем ни кабинет, ни просьбу войти.
    if (status === 'loading') return <Loader />;

    if (status === 'guest') {
        return (
            <div className={styles.prompt}>
                <p>Личный кабинет доступен после входа.</p>
                <Button
                    type="button"
                    variant="contained"
                    onClick={() => getAuthDialogActions().open('signIn')}
                >
                    Войти
                </Button>
            </div>
        );
    }

    return <>{children}</>;
};

export default RequireAuth;
