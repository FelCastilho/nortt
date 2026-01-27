import "./style.css"

function Historico({ transacoes }) {
  return (
    <div className="historico">
      <h1>Histórico</h1>

      <div className="transacoes">
        {transacoes.map((t, index) => (
          <div
            key={index}
            className={`transacao ${t.tipo}`}
          >
            <span className="valor">
              {t.tipo === "entrada" ? "+" : "-"} R$ {t.valor}
            </span>
            <span className="descricao">{t.descricao}</span>
            <span className="data">{t.data}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Historico
