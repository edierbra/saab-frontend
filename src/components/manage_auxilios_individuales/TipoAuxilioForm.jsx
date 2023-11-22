import { useEffect } from "react"
import { Divider } from "../layout/divider"

export const TipoAuxilioForm = ({ onlyShow, setAuxilioForm, auxilioForm, idSindicato, idTipoAuxilioIndividual, tiposAuxiliosIndividualesBySindicatoId, onOptionsSelect, onInputChange, sindicatos }) => {

    useEffect(() => {
        setAuxilioForm(
            {
                ...auxilioForm,
                idTipoAuxilioIndividual: 0
            }
        )
    }, [, idSindicato])

    return (
        <>
            <Divider content={'Tipo de Auxilio'} />

            <div className="mb-1">
                <label className="form-label fs-16px-login-label mb-0">Sindicato</label>
                <select
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="idSindicato"
                    onChange={onInputChange}
                    disabled={auxilioForm.id != 0 || onlyShow}
                    value={idSindicato}
                >
                    {onOptionsSelect(sindicatos, 'Seleccione un Sindicato', idSindicato)}
                </select>
            </div>

            <div className="mb-1">
                <label className="form-label fs-16px-login-label mb-0">Tipo de Auxilio</label>
                <select
                    disabled={idSindicato == "0" || auxilioForm.id != 0 || onlyShow}
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="idTipoAuxilioIndividual"
                    onChange={onInputChange}
                    value={idTipoAuxilioIndividual}
                >
                    {onOptionsSelect(tiposAuxiliosIndividualesBySindicatoId, "Tipo de Auxilio", idTipoAuxilioIndividual)}
                </select>
            </div>

        </>
    )
}