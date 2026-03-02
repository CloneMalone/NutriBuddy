import { useRef, useEffect, useCallback } from "react";
import todayDateString from "../utils/todayDateString";
import formatDateLabel from "../utils/formatDateLabel";

interface DatePickerButtonProps {
    /** Currently selected date in YYYY-MM-DD format. */
    selectedDate: string;
    /** Called when the user picks a new date. */
    onDateChange: (date: string) => void;
    /** Latest selectable date (YYYY-MM-DD). Dates after this are disabled. */
    maxDate: string;
}

/**
 * Dumb component — renders a DaisyUI + Cally popover calendar date picker.
 * Shows "Today" when the selected date matches today, otherwise shows a
 * human-friendly formatted date (e.g. "Mar 1, 2026").
 */
export default function DatePickerButton({ selectedDate, onDateChange, maxDate }: DatePickerButtonProps) {
    const calendarRef = useRef<HTMLElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    /** Display label — "Today" or a formatted date like "Mar 1, 2026". */
    const displayLabel = selectedDate === todayDateString() ? "Today" : formatDateLabel(selectedDate);

    /** Listen for the Cally `change` event (web component — not a React synthetic event). */
    const handleCalendarChange = useCallback(
        (e: Event) => {
            const target = e.target as HTMLElement & { value?: string };
            if (target.value) {
                onDateChange(target.value);

                // Close the popover after a date is selected
                popoverRef.current?.hidePopover();
            }
        },
        [onDateChange],
    );

    // Attach / detach the native change listener on the <calendar-date> element
    useEffect(() => {
        const el = calendarRef.current;
        if (!el) return;
        el.addEventListener("change", handleCalendarChange);
        return () => el.removeEventListener("change", handleCalendarChange);
    }, [handleCalendarChange]);

    return (
        <>
            {/* Trigger button */}
            <button
                popoverTarget="cally-popover"
                className="btn btn-soft btn-primary btn-sm"
                id="cally-trigger"
                style={{ anchorName: "--cally-trigger" } as React.CSSProperties}
            >
                {/* Calendar icon */}
                <svg
                    className="size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {displayLabel}
            </button>

            {/* Calendar popover */}
            <div
                ref={popoverRef}
                popover="auto"
                id="cally-popover"
                className="dropdown bg-base-100 rounded-box shadow-lg"
                style={{ positionAnchor: "--cally-trigger" } as React.CSSProperties}
            >
                <calendar-date
                    ref={calendarRef}
                    className="cally"
                    value={selectedDate}
                    max={maxDate}
                >
                    <svg
                        aria-label="Previous"
                        className="fill-current size-4"
                        slot="previous"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    <svg
                        aria-label="Next"
                        className="fill-current size-4"
                        slot="next"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                    <calendar-month />
                </calendar-date>
            </div>
        </>
    );
}
