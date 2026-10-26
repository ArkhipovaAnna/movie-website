import { useEffect, useRef, useState } from 'react';

// Сообщает, виден ли элемент на экране (с запасом rootMargin вокруг области просмотра).
const useInView = <T extends Element>(rootMargin = '0px') => {

    const ref = useRef<T>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { rootMargin },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [rootMargin]);

    return { ref, inView };
};

export default useInView
