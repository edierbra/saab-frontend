export const Btn = ({ onClick, dataOnClick, icon, style, text }) => {
    return (
        <>
            <button
                type="button"
                className={`${style} px-1`}
                onClick={() =>
                    onClick(dataOnClick)
                }>
                <i typeof="button" className={`${icon} fs-5`}></i>
                <span className={text=="" ? 'd-none' : 'ms-1 d-none d-lg-inline'}>{text}</span>
            </button>
        </>
    )
}