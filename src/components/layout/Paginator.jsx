import { Link } from "react-router-dom"

export const Paginator = ({ url, paginator }) => {
    return (
        <>
            {paginator?.totalPages == 1 ||
                <ul className="pagination text-sidebar rounded shadow-xx">
                    <li className={paginator.first ? 'page-item disabled' : 'page-item'}>
                        <Link className="page-link" to={`${url}/0`} aria-label="Siguiente">
                            <i className="bi bi-chevron-bar-left "></i>
                        </Link>
                    </li>

                    {
                        paginator.number == 0 ||
                        <li className="page-item" data-toggle="popover" data-content="Este es un botón">
                            <Link className="page-link" to={`${url}/${paginator.number - 1}`} >
                                <i className="bi bi-chevron-double-left" ></i>
                            </Link>
                        </li>
                    }

                    {
                        paginator.number >= paginator.totalPages - 1 ||
                        <li className="page-item">
                            <Link className="page-link" to={`${url}/${paginator.number + 1}`} >
                                <i className="bi bi-chevron-double-right"></i>
                            </Link>
                        </li>
                    }

                    <li className={paginator.last ? 'page-item disabled' : 'page-item'}>
                        <Link className="page-link" to={`${url}/${paginator.totalPages - 1}`} >
                            <i className="bi bi-chevron-bar-right"></i>
                        </Link>
                    </li>
                </ul>
            }
        </>
    )
}