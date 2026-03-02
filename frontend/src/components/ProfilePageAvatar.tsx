interface ProfilePageAvatarProps {
    firstName: string;
    lastName: string;
    firstInitial: string;
    lastInitial: string;
}

/** Presentational component — displays the user's avatar and full name. */
export default function ProfilePageAvatar({ firstName, lastName, firstInitial, lastInitial }: ProfilePageAvatarProps) {
    return (
        <>
            <div className="avatar avatar-placeholder mb-4">
                <div className="ring-primary ring-offset-base-100 w-35 rounded-full ring-2 ring-offset-2 bg-neutral text-neutral-content w-24 rounded-full">
                    <span className="text-3xl">{firstInitial}{lastInitial}</span>
                </div>
            </div>
            <h2 className="text-lg font-semibold">{firstName} {lastName}</h2>
        </>
    );
}