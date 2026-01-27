import "./style.css"

function Inicio({ saldo, transacoes, abrirModal }) {
  const ultimas = transacoes.slice(-4).reverse()

  const entradas = transacoes
    .filter(t => t.tipo === "entrada")
    .reduce((acc, t) => acc + t.valor, 0)

  const saidas = transacoes
    .filter(t => t.tipo === "saida")
    .reduce((acc, t) => acc + t.valor, 0)

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Início</h1>
          <p className="subtitle">Resumo da sua conta</p>
        </div>

        <button className="btn-add" onClick={abrirModal}>
          + Nova transferência
        </button>
      </div>

      {/* Saldo */}
      <div className="saldo-card">
        <span>Saldo atual</span>
        <h2>R$ {saldo.toFixed(2)}</h2>
      </div>

      {/* Resumo */}
      <div className="cards">
        <div className="card entrada">
          <span>Entradas</span>
          <strong>R$ {entradas.toFixed(2)}</strong>
        </div>

        <div className="card saida">
          <span>Saídas</span>
          <strong>R$ {saidas.toFixed(2)}</strong>
        </div>

        <div className="card">
          <span>Total de movimentações</span>
          <strong>{transacoes.length}</strong>
        </div>
      </div>

      {/* Últimas movimentações */}
      <div className="section">
        <h3>Últimas movimentações</h3>

        {ultimas.length === 0 ? (
          <p className="empty">Nenhuma movimentação ainda.</p>
        ) : (
          <ul className="lista">
            {ultimas.map((t, index) => (
              <li key={index} className={t.tipo}>
                <span>
                  {t.tipo === "entrada" ? "+" : "-"} R$ {t.valor}
                </span>
                <small>{t.descricao}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Inicio
