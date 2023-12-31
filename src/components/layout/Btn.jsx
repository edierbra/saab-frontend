export const Btn = ({ onClick, dataOnClick, icon, style, text, type }) => {
    return (
        <>
            <button
                type={type}
                className={`${style} py-1 px-2 mx-1`}
                onClick={() =>
                    onClick(dataOnClick)
                }>
                <i typeof="button" className={`${icon}`}>
                    <span className={text == "" ? 'd-none' : 'ms-1 d-none d-lg-inline'}>{text}</span>
                </i>
            </button>
        </>
    )
}