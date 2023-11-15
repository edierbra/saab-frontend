export const Divider = ({content}) => {
    return (
        <>
            <div className="d-flex justify-content-between align-content-center align-items-center px-5">
                <hr className="w-25" />
                <p className="text-center m-0 d-block">{content}</p>
                <hr className="w-25" />
            </div>
        </>
    )
}