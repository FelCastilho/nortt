import { useState } from "react"
import BudgetModal from "./budget-modal/BudgetModal"
import "./style.css"

function Calculadora() {
  const [display, setDisplay] = useState("")
  const [historico, setHistorico] = useState([])
  const [modalAberto, setModalAberto] = useState(false)
  const [planejamento, setPlanejamento] = useState(null)

  function calcular() {
    try {
      const resultado = eval(display)
      setHistorico(prev => [`${display} = ${resultado}`, ...prev.slice(0, 9)])
      setDisplay(String(resultado))
    } catch {
      alert("Cálculo inválido")
    }
  }

  return (
    <div className="calculadora-page">
      {/* CALCULADORA */}
      <div className="calc-container">
        <h1>Calculadora</h1>

        <input className="display" value={display} readOnly />

        <div className="teclado">
          {["7","8","9","/",
            "4","5","6","*",
            "1","2","3","-",
            "0",".","+"
          ].map(btn => (
            <button key={btn} onClick={() => setDisplay(display + btn)}>
              {btn}
            </button>
          ))}

          <button className="igual" onClick={calcular}>=</button>
          <button className="limpar" onClick={() => setDisplay("")}>Limpar</button>
        </div>
      </div>

      {/* LADO DIREITO */}
      <div className="calc-side">
        {/* PLANEJAMENTO */}
        <div className="calc-planejamento">
          <h2>Planejamento</h2>
          <p>Veja por quantos meses você consegue viver sem renda</p>

          <button className="btn-primary" onClick={() => setModalAberto(true)}>
            Calcular meses sem renda
          </button>

          {planejamento && (
            <>
              <div className="resultado">
                <strong>Total:</strong> R$ {planejamento.total}<br />
                <strong>Gasto mensal:</strong> R$ {planejamento.gastoMensal}<br />
                <strong>Meses:</strong> {planejamento.meses}
              </div>

              <div className="budget-simulacao">
                {planejamento.simulacao.map(item => (
                  <div key={item.mes} className="budget-simulacao-item">
                    <span>Mês {item.mes}</span>
                    <strong>R$ {item.restante}</strong>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* HISTÓRICO */}
        <div className="calc-historico">
          <h2>Recentes</h2>
          <ul>
            {historico.length === 0 && <li>Nenhum cálculo ainda</li>}
            {historico.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {modalAberto && (
        <BudgetModal
          onClose={() => setModalAberto(false)}
          onCalcular={(dados) => {
            setPlanejamento(dados)
            setModalAberto(false)
          }}
        />
      )}
    </div>
  )
}

export default Calculadora
