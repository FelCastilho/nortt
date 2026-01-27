import { useState } from "react"
import "../style.css"

function BudgetModal({ onClose, onCalcular }) {
  const [total, setTotal] = useState("")
  const [gastoMensal, setGastoMensal] = useState("")

  function calcular() {
    const t = Number(total)
    const g = Number(gastoMensal)

    if (!t || !g || g <= 0) {
      alert("Valores inválidos")
      return
    }

    const meses = Math.floor(t / g)
    let restante = t

    const simulacao = []

    for (let i = 1; i <= meses; i++) {
      restante -= g
      simulacao.push({
        mes: i,
        restante: Math.max(restante, 0)
      })
    }

    onCalcular({
      total: t,
      gastoMensal: g,
      meses,
      simulacao
    })
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Meses sem renda</h2>

        <input
          type="number"
          placeholder="Dinheiro disponível"
          value={total}
          onChange={e => setTotal(e.target.value)}
        />

        <input
          type="number"
          placeholder="Gasto mensal"
          value={gastoMensal}
          onChange={e => setGastoMensal(e.target.value)}
        />

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-primary" onClick={calcular}>
            Calcular
          </button>
        </div>
      </div>
    </div>
  )
}

export default BudgetModal
