import { format } from "date-fns";

export function formatDateToLocalTime(date: Date | string): string {
    return format(new Date(date), "PP");
}