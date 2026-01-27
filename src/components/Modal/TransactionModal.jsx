import { useState } from "react"
import "./style.css"

function TransactionModal({ onClose, onAdd }) {
  const [valor, setValor] = useState("")
  const [descricao, setDescricao] = useState("")
  const [tipo, setTipo] = useState("entrada")

  function handleSubmit() {
    if (!valor) return

    onAdd({
      tipo,
      valor: Number(valor),
      descricao,
      data: new Date().toLocaleDateString("pt-BR")
    })

    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Nova movimentação</h2>

        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />

        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <div className="tipo">
          <button
            className={tipo === "entrada" ? "active" : ""}
            onClick={() => setTipo("entrada")}
          >
            Entrada
          </button>

          <button
            className={tipo === "saida" ? "active" : ""}
            onClick={() => setTipo("saida")}
          >
            Saída
          </button>
        </div>

        <div className="acoes">
          <button onClick={onClose} className="cancelar">
            Cancelar
          </button>
          <button onClick={handleSubmit} className="confirmar">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}

export default TransactionModal
