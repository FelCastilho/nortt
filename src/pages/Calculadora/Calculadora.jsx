import { useState } from "react"
import BudgetModal from "./budget-modal/BudgetModal"
import "./style.css"

function Calculadora() {
  const [expressao, setExpressao] = useState("")
  const [historico, setHistorico] = useState([])
  const [modalAberto, setModalAberto] = useState(false)

  function adicionar(valor) {
    setExpressao(prev => prev + valor)
  }

  function limpar() {
    setExpressao("")
  }

  function calcular() {
    if (!expressao) return

    try {
      const resultado = eval(expressao)
      const registro = `${expressao} = ${resultado}`

      setHistorico(prev => [registro, ...prev.slice(0, 4)])
      setExpressao(String(resultado))
    } catch {
      setExpressao("Erro")
    }
  }

  return (
    <div className="calculadora-page">
      {/* Calculadora padrão */}
      <div className="calc-container">
        <h1>Calculadora</h1>

        <input
          className="display"
          value={expressao}
          readOnly
        />

        <div className="teclado">
          {["7","8","9","/","4","5","6","*","1","2","3","-","0",".","+","="].map(btn => (
            <button
              key={btn}
              className={btn === "=" ? "igual" : ""}
              onClick={() => btn === "=" ? calcular() : adicionar(btn)}
            >
              {btn}
            </button>
          ))}

          <button className="limpar" onClick={limpar}>
            Limpar
          </button>
        </div>
      </div>

      {/* Lado direito */}
      <div className="calc-side">
        {/* Recentes */}
        <div className="calc-historico">
          <h2>Recentes</h2>

          {historico.length === 0 ? (
            <p className="empty">Nenhum cálculo ainda.</p>
          ) : (
            <ul>
              {historico.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Planejamento */}
        <div className="calc-planejamento">
          <h2>Planejamento</h2>
          <p>
            Descubra por quanto tempo você consegue se manter
            apenas com o dinheiro atual.
          </p>

          <button
            className="btn-add"
            onClick={() => setModalAberto(true)}
          >
            Calcular meses sem renda
          </button>
        </div>
      </div>

      {modalAberto && (
        <BudgetModal onClose={() => setModalAberto(false)} />
      )}
    </div>
  )
}

export default Calculadora
