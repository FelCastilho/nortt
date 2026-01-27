import { useState } from "react"
import "../style.css"

function BudgetModal({ onClose }) {
  const [total, setTotal] = useState("")
  const [gasto, setGasto] = useState("")
  const [resultado, setResultado] = useState(null)

  function calcular() {
    if (!total || !gasto || gasto <= 0) return

    const meses = (Number(total) / Number(gasto)).toFixed(1)
    setResultado(meses)
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Planejamento financeiro</h2>

        <input
          type="number"
          placeholder="Quanto dinheiro você tem?"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
        />

        <input
          type="number"
          placeholder="Gasto mensal"
          value={gasto}
          onChange={(e) => setGasto(e.target.value)}
        />

        {resultado && (
          <p className="resultado">
            Seu dinheiro dura cerca de{" "}
            <strong>{resultado} meses</strong>
          </p>
        )}

        <div className="acoes">
          <button onClick={onClose} className="cancelar">
            Fechar
          </button>
          <button onClick={calcular} className="confirmar">
            Calcular
          </button>
        </div>
      </div>
    </div>
  )
}

export default BudgetModal
