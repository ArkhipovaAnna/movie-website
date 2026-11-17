import { Link } from 'react-router';
import { useAuthEmail, useAuthStatus } from '@/app/stores/use-auth-store';
import { getAuthDialogActions } from '@/app/stores/use-auth-dialog-store';
import useProfile from '@/features/auth/useProfile';
import useSignOut from '@/features/auth/useSignOut';
import Button from '@/shared/ui/Button/Button';
import { handleSetSearchFormValue } from "@/app/stores/use-searchFormValue-store";
import styles from './UserMenu.module.scss';

const UserMenu = () => {
    const status = useAuthStatus();
    const email = useAuthEmail();
    const { data: profile } = useProfile();
    const signOut = useSignOut();

    const setSearchFormValue = handleSetSearchFormValue();

    // Пока проверяем сохранённый вход, ничего не показываем, чтобы не мигала кнопка «Войти».
    if (status === 'loading') return null;

    if (status === 'guest') {
        return (
            <div className={styles.menu}>
                <Button type="button" variant="contained" onClick={() => {
                    getAuthDialogActions().open('signIn')
                    setSearchFormValue('')
                }
                }>
                    Войти
                </Button>
                <Button type="button" variant="contained" onClick={() => {
                    getAuthDialogActions().open('signUp')
                    setSearchFormValue('')
                }}>
                    Регистрация
                </Button>
            </div>
        );
    }

    return (
        <div className={styles.menu}>
            <Link to="/profile" className={styles.nickname}>
                {profile?.nickname ?? email}
            </Link>
            <Button type="button" variant="outlined" onClick={() => {
                signOut.mutate()
                setSearchFormValue('')
            }}>
                Выйти
            </Button>
        </div>
    );
};

export default UserMenu;
