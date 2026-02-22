interface ProfilePageAvatarProps {
    firstName: string;
    lastName: string;
}

/** Presentational component — displays the user's avatar and full name. */
export default function ProfilePageAvatar({ firstName, lastName }: ProfilePageAvatarProps) {
    return (
        <>
            <div className="avatar mb-4">
                <div className="ring-primary ring-offset-base-100 w-35 rounded-full ring-2 ring-offset-2">
                    <img
                        alt={`${firstName} ${lastName}`}
                        src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                    />
                </div>
            </div>
            <h2 className="text-lg font-semibold">{firstName} {lastName}</h2>
        </>
    );
}