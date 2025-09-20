

export type IApiResponses<T> = {
    statusCode: number,
    message?: string | null,
    success: boolean,
    data?: T | null
    meta?: {              // ✅ এখানে meta add করুন
        page: number;
        limit: number;
        total: number;
    };
}