import { Divider } from "../layout/divider"

export const ValorAuxilioForm = ({ onInputChange, valor }) => {
    return (
        <>
            <Divider
                content={"Valor del auxilio"}
            />

            <div className="mb-1">
                <label className="form-label fs-16px-login-label mb-0">{"(Opcional) Fecha de Calculo"}</label>
                <input
                    type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Fecha Calculo " name='valor' value={valor}
                    onChange={onInputChange}
                />
                <p className="d-flex justify-content-end c">Por defecto: Fecha de la solicitud </p>
            </div>

            <div>
                <label className="form-label fs-16px-login-label mb-0">Valor del auxilio</label>
                <div className="d-flex justify-content-between align-content-center align-items-center">
                    <button
                        className="btn btn-login btn-sm py-0"
                        type="button"
                    >
                        Calcular:
                    </button>

                    <div className="mb-0">
                        <input
                            type="number" className="form-control date rounded-pill fs-16px-login-input py-0"
                            placeholder="Valor del auxilo" name='valor' value={valor}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
            </div>

        </>
    )
}