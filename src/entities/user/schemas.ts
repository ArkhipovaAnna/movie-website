import { z } from 'zod';

// Тот же шаблон, что в проверке nickname_format в базе данных.
export const NICKNAME_RE = /^[A-Za-zА-Яа-яЁё0-9_-]{3,20}$/;

export const ProfileSchema = z
    .object({
        nickname: z.string(),
        created_at: z.string(),
        last_seen_at: z.string(),
    })
    .transform((p) => ({
        nickname: p.nickname,
        createdAt: p.created_at,
        lastSeenAt: p.last_seen_at,
    }));

export type Profile = z.output<typeof ProfileSchema>;
