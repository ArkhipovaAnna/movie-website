import ContentWrapper from '@/shared/ui/ContentWrapper/ContentWrapper';
import { usePreviousVisit } from '@/app/stores/use-auth-store';
import useProfile from '@/features/auth/useProfile';
import ProfileView from './ProfileView';

const ProfilePage = () => {
    const { data: profile, isLoading, isError, error } = useProfile();
    const previousVisit = usePreviousVisit();

    const status =
        isLoading ? 'loading' :
            isError || !profile ? 'fail' :
                'success';

    return (
        <ContentWrapper status={status} error={error}>
            {profile && <ProfileView profile={profile} previousVisit={previousVisit} />}
        </ContentWrapper>
    );
};

export default ProfilePage;
