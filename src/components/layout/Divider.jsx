export const Divider = ({content}) => {
    return (
        <>
            <div className="d-flex justify-content-between align-content-center align-items-center m-0 px-5">
                <hr className="w-25" />
                <p className="text-center m-0 d-block w-auto">{content}</p>
                <hr className="w-25" />
            </div>
        </>
    )
}