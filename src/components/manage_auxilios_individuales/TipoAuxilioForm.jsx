import { useEffect } from "react"
import { Divider } from "../layout/divider"

export const TipoAuxilioForm = ({ setAuxilioForm, auxilioForm, tiposAuxiliosIndividuales, idSindicato, idTipoAuxilioIndividual, tiposAuxiliosIndividualesBySindicatoId, onOptionsSelect, onInputChange, sindicatos }) => {

    useEffect(() => {
        setAuxilioForm(
            {
                ...auxilioForm,
                idTipoAuxilioIndividual: 0
            }
        )
    }, [idSindicato])

    return (
        <>
            <Divider content={'Tipo de Auxilio'} />

            <div className="mb-1">
                <label className="form-label fs-16px-login-label mb-0">Sindicato</label>
                <select
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="idSindicato"
                    onChange={onInputChange}
                >
                    {onOptionsSelect(sindicatos, 'Seleccione un Sindicato')}
                </select>
            </div>

            <div className="mb-1">
                <label className="form-label fs-16px-login-label mb-0">Tipo de Auxilio</label>
                <select
                    disabled={idSindicato == "0"}
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="idTipoAuxilioIndividual"
                    onChange={onInputChange}
                >
                    {onOptionsSelect(tiposAuxiliosIndividualesBySindicatoId, "Tipo de Auxilio")}
                </select>
            </div>

        </>
    )
}