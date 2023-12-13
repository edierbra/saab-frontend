export const Spinner = () => {
    return (
        <>
            {/* <div className="d-flex justify-content-center align-items-center vh-100">
                <button className="btn btn-primary" type="button" disabled>
                    <span className="spinner-grow spinner-grow-sm me-2" aria-hidden="true"></span>
                    <span role="status">Cargando...</span>
                </button>
            </div> */}
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-center text-blue" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}