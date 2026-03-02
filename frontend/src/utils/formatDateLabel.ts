/**
 * Formats a YYYY-MM-DD date string into a human-friendly label.
 * e.g. "2026-03-01" → "Mar 1, 2026"
 *
 * Parses year/month/day manually to avoid timezone-related date shifting.
 */
export default function formatDateLabel(date: string): string {
    const [year, month, day] = date.split("-").map(Number);

    // Month names — Date.toLocaleDateString would work too, but parsing
    // from the YYYY-MM-DD parts avoids timezone edge-cases entirely.
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    return `${monthNames[month - 1]} ${day}, ${year}`;
}
