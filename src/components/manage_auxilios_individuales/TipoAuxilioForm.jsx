import { useEffect } from "react"
import { Divider } from "../layout/Divider"
import { onOptionsSelect } from "../recursos/Funciones"
import { useAuxiliosIndividuales } from "../../hooks/useAuxiliosIndividuales"
import { useOthersEntities } from "../../hooks/useOthersEntities"

export const TipoAuxilioForm = ({ onlyShow, auxilioForm, onInputChange }) => {

    const { sindicatos, tiposAuxiliosIndividualesBySindicatoId} = useOthersEntities()
    const { errors } = useAuxiliosIndividuales();

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
                    value={auxilioForm.idSindicato}
                >
                    {onOptionsSelect(sindicatos, 'Seleccione un Sindicato', false)}
                </select>
                <p className="text-danger mb-0">{errors?.idSindicato}</p>
            </div>

            <div className="mb-1">
                <label className="form-label fs-16px-login-label mb-0">Tipo de Auxilio</label>
                <select
                    disabled={auxilioForm.idSindicato == "0" || auxilioForm.id != 0 || onlyShow}
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="idTipoAuxilioIndividual"
                    onChange={onInputChange}
                    value={auxilioForm.idTipoAuxilioIndividual}
                >
                    {onOptionsSelect(tiposAuxiliosIndividualesBySindicatoId, "Tipo de Auxilio", false)}
                </select>
                <p className="text-danger mb-0">{errors?.idTipoAuxilioIndividual}</p>
            </div>

        </>
    )
}