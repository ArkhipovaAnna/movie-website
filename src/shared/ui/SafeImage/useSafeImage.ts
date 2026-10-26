import { useState } from 'react';
import getSafeImageUrl from '@/shared/helpers/getSafeImageUrl';
import { PLACEHOLDER_SRC } from '@/shared/config/images';

// Свойства для <img>: проверенный src, запрет Referer и запасная картинка при ошибке загрузки.
const useSafeImage = (url: string | null | undefined, fallback: string = PLACEHOLDER_SRC) => {

    const [failedUrl, setFailedUrl] = useState<string | null>(null);

    const safeUrl = getSafeImageUrl(url);
    const src = safeUrl && safeUrl !== failedUrl ? safeUrl : fallback;

    // Если не загрузилась сама запасная картинка, состояние не меняется,
    // поэтому onError не зацикливается.
    const onError = () => {
        if (src !== fallback) setFailedUrl(src);
    };

    return {
        src,
        onError,
        referrerPolicy: 'no-referrer' as const,
        loading: 'lazy' as const,
        decoding: 'async' as const,
    };
};

export default useSafeImage
