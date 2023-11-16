import { Divider } from "../layout/divider"

export const TipoAuxilioForm = ({tiposAuxiliosIndividuales, onOptionsSelect}) => {
    return (
        <>
            <Divider content={'Tipo de Auxilio'} />

            {/* <div className="mb-1">
                <label className="form-label fs-16px-login-label mb-0">Identificacion</label>
                <input
                    type="text" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Identificacion del Funcionario" name='id' value={funcionarioForm?.id}
                    disabled
                />
            </div> */}

            {console.log(tiposAuxiliosIndividuales)}

            <div className="mb-1">
                <label className="form-label fs-16px-login-label mb-0">Tipo de Auxilio</label>
                <select
                    className="form-select rounded-pill fs-16px-login-input py-0"
                >
                    {onOptionsSelect(tiposAuxiliosIndividuales, 'Tipo de Auxilio')}
                </select>
            </div>

        </>
    )
}