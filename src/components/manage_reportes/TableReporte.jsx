export const TableReporte = ({ excelData }) => {
    return (
        <>
            <div className="my-2 overflow-auto rounded shadow-xx " style={{ maxWidth: '100%', maxHeight: '37vh' }}>
                {(excelData.length > 0) && (
                    <table className="mb-0 table table-hover table-striped table-bordered">
                        <thead className="fs-16px-login-label">
                            <tr>
                                {excelData[0].map((cell, index) => (
                                    <th key={index}>{cell}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {excelData.slice(1).map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}