import { useAuthSession } from './useAuthSession';

// Ничего не рисует, только запускает отслеживание сессии.
const AuthSession = () => {
    useAuthSession();
    return null;
};

export default AuthSession;
