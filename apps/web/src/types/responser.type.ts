export type ResponseType<T> = {
    statusCode: string | number,
    message: string,
    data?: T
}