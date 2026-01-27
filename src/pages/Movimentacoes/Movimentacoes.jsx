import { useState } from "react"
import TransactionModal from "../../components/Modal/TransactionModal"

function Movimentacoes({ onAdd }) {
  const [modalAberto, setModalAberto] = useState(false)

  return (
    <div>
      <h1>Movimentações</h1>
      <p>Adicione entradas ou saídas na sua conta.</p>

      <button onClick={() => setModalAberto(true)}>
        Nova movimentação
      </button>

      {modalAberto && (
        <TransactionModal
          onClose={() => setModalAberto(false)}
          onAdd={onAdd}
        />
      )}
    </div>
  )
}

export default Movimentacoes
