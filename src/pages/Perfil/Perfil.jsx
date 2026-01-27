import "./style.css"

function Perfil({ transacoes = [], saldo = 0 }) {
  const entradas = transacoes.filter(t => t.tipo === "entrada").length
  const saidas = transacoes.filter(t => t.tipo === "saida").length

  return (
    <div className="perfil">
      <div className="perfil-header">
        <h1>Perfil</h1>
        <p>Informações da sua conta e resumo financeiro</p>
      </div>

      <div className="perfil-grid">
        <div className="perfil-card destaque">
          <span className="label">Saldo atual</span>
          <strong>R$ {saldo.toFixed(2)}</strong>
        </div>

        <div className="perfil-card">
          <span className="label">Entradas</span>
          <strong>{entradas}</strong>
        </div>

        <div className="perfil-card">
          <span className="label">Saídas</span>
          <strong>{saidas}</strong>
        </div>
      </div>

      <div className="perfil-section">
        <h2>Conta</h2>

        <div className="perfil-info">
          <div>
            <span>Email</span>
            <strong>usuario@nortt.app</strong>
          </div>

          <div>
            <span>Plano</span>
            <strong>Gratuito</strong>
          </div>

          <div>
            <span>Moeda</span>
            <strong>Real (BRL)</strong>
          </div>
        </div>
      </div>

      <div className="perfil-section">
        <h2>Sobre a Nortt</h2>
        <p>
          A Nortt foi criada para tornar o controle financeiro simples,
          acessível e visualmente claro — sem complicação.
        </p>
      </div>
    </div>
  )
}

export default Perfil
