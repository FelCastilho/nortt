import { useState } from "react"
import { addTransaction } from "../../services/transactions"
import { auth } from "../../firebase/firebase"
import "./style.css"

function TransactionModal({ onClose, onSaved }) {
  const [valor, setValor] = useState("")
  const [descricao, setDescricao] = useState("")
  const [tipo, setTipo] = useState("entrada")
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!valor) return

    try {
      setLoading(true)

      const user = auth.currentUser
      if (!user) {
        alert("Usuário não autenticado")
        return
      }

      await addTransaction(user.uid, {
        tipo,
        valor: Number(valor),
        descricao
      })

      onSaved?.()
      onClose()
    } catch (error) {
      alert("Erro ao salvar transação")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Nova movimentação</h2>

        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={e => setValor(e.target.value)}
        />

        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
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

          <button
            onClick={handleSubmit}
            className="confirmar"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TransactionModal
