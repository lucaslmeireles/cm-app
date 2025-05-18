export const calculateYears = (date: Date | string) => {
    const now = Date.now()
    const start = new Date(date);
    const diff =  now - start.getTime();
    const diffDate = new Date(diff);
    return diffDate.getFullYear() - 1970;
}