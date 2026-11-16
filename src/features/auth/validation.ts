import { z } from 'zod';
import { NICKNAME_RE } from '@/entities/user/schemas';

const email = z.string().trim().pipe(z.email('Введите корректный email'));

// Пароль не обрезаем: пробелы в нём допустимы.
// 72 символа: ограничение алгоритма хеширования паролей в Supabase.
const newPassword = z
    .string()
    .min(8, 'Минимум 8 символов')
    .max(72, 'Максимум 72 символа');

export const SignInSchema = z.object({
    email,
    // При входе длину не проверяем: достаточно, чтобы поле не было пустым.
    password: z.string().min(1, 'Введите пароль'),
});

export const SignUpSchema = z
    .object({
        nickname: z
            .string()
            .trim()
            .regex(NICKNAME_RE, 'От 3 до 20 символов: буквы, цифры, _ и -'),
        email,
        password: newPassword,
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],//к какому полю привязать ошибку. 
        message: 'Пароли не совпадают',
    });

// Превращает ошибку zod в { имяПоля: 'первое сообщение' } для показа под полями.
export const getFieldErrors = (error: z.ZodError): Record<string, string | undefined> => {
    const fieldErrors = z.flattenError(error).fieldErrors as Record<string, string[] | undefined>;
    return Object.fromEntries(Object.entries(fieldErrors).map(([name, messages]) => [name, messages?.[0]]));
};
