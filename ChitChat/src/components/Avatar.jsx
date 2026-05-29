/* eslint-disable react/prop-types */

const Avatar = ({ name = "", src = "", isOnline = null, size = "md" }) => {
    const sizes = {
        sm: "h-9 w-9 rounded-2xl text-base",
        md: "h-12 w-12 rounded-2xl text-xl",
        lg: "h-14 w-14 rounded-3xl text-2xl",
    }

    return (
        <div className='relative shrink-0'>
            {src ? (
                <img className={`${sizes[size]} object-cover shadow-lg shadow-cyan-500/15`} src={src} alt={name} />
            ) : (
                <div className={`${sizes[size]} flex items-center justify-center bg-gradient-to-br from-brand-400 to-brand-700 font-semibold text-white shadow-lg shadow-cyan-500/15`}>
                    {name?.[0]?.toUpperCase()}
                </div>
            )}
            {typeof isOnline === "boolean" && (
                <span className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-ink-900 ${isOnline ? 'bg-emerald-400' : 'bg-slate-400'}`}></span>
            )}
        </div>
    )
}

export default Avatar
