export const Btn = ({ onClick, dataOnClick, icon, style }) => {
    return (
        <>
            <button
                type="button"
                className={style}
                onClick={() =>
                    onClick(dataOnClick)
                }>
                <i typeof="button" className={`${icon} mx-1 fs-5`}></i>
            </button>
        </>
    )
}