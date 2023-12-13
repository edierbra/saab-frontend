import { useAuxiliosIndividuales } from "../../hooks/useAuxiliosIndividuales"
import { Divider } from "../layout/Divider"

export const ValorAuxilioForm = ({ onlyShow, onInputChange, valor, fechaOpcionalCalculo }) => {

    const { errors } = useAuxiliosIndividuales();
    
    return (
        <>
            <Divider
                content={"Valor del auxilio"}
            />

            <div className="mb-1">
                <label className="form-label fs-16px-login-label mb-0">{"(Opcional) Fecha de Calculo"}</label>
                <input
                    type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Fecha Calculo " name='fechaOpcionalCalculo' value={fechaOpcionalCalculo}
                    onChange={onInputChange}
                    disabled={onlyShow}
                />
                <p className="d-flex justify-content-end fw-bold fs-7 m-0">Por defecto: Fecha de la solicitud </p>
                <p className="text-danger mb-0">{errors?.fechaOpcionalCalculo}</p>
            </div>

            <div className="mb-2">
                <label className="form-label fs-16px-login-label mb-0">Valor del auxilio</label>
                <div className="d-flex justify-content-between align-items-start">
                    <button
                        className="btn btn-login btn-sm py-0 me-2"
                        type="button"
                        disabled={onlyShow}
                    >
                        Calcular:
                    </button>

                    <div className="mb-0">
                        <input
                            type="number" className="form-control date rounded-pill fs-16px-login-input py-0"
                            placeholder="Valor del auxilo" name='valor' value={valor}
                            onChange={onInputChange}
                            disabled={onlyShow}
                        />
                        <p className="text-danger mb-0">{errors?.valor}</p>
                    </div>
                </div>
            </div>
        </>
    )
}