export const BtnSubmit = ({ type, style, icon, text }) => {
    return (
        <>
            <button
                type={type}
                className={`${style} py-1 px-2 mx-1`} >
                <i typeof="button" className={`${icon}`}>
                    <span className={text == "" ? 'd-none' : 'ms-1 d-none d-lg-inline'}>{text}</span>
                </i>
            </button>
        </>
    )
}