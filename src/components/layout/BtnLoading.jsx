export const BtnLoading = ({ style, icon, text }) => {
    return (
        <>
            <button
                className={`${style} py-1 px-2 mx-1`}
                disabled
            >
                <div className="d-flex align-items-center">
                    <span className="spinner-border spinner-border-sm text-center text-blue" role="status" />
                    <div className={text == "" ? 'd-none' : 'ms-1 d-none d-lg-inline'}>
                        <span>{text}</span>
                    </div>
                </div>



            </button>
        </>
    )
}