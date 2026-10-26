import type { ImgHTMLAttributes } from 'react';
import useSafeImage from './useSafeImage';

interface SafeImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
    src: string | null | undefined;
    alt: string;
    fallback?: string;
}

const SafeImage = ({ src, fallback, alt, ...rest }: SafeImageProps) => {

    const safeProps = useSafeImage(src, fallback);

    // safeProps идёт последним, чтобы src, referrerPolicy и onError нельзя было переопределить снаружи.
    return <img {...rest} {...safeProps} alt={alt} />;
}

export default SafeImage
