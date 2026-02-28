/**
     * Convert a Date to YYYY-MM-DD string format for SQLite storage.
     * Uses local time to match how the frontend sends dates.
     */
    export default function toDateString(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }