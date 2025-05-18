import { Position } from '@prisma/client';

export type CarrerPathSanitized = {
    id: string;
    employee: {
        name: string;
        profile_pic: string;
        current_position: Position;
    };
    start_date: Date;
    target_date: Date;
    description: string;
    status: string;
};
