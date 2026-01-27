import { useState } from "react"
import "./style.css"

function Historico({ transacoes }) {
  const [tipo, setTipo] = useState("todas")
  const [mes, setMes] = useState("")

  const temTransacoes = transacoes.length > 0

  const transacoesFiltradas = transacoes.filter(t => {
    const data = new Date(
      t.createdAt?.seconds
        ? t.createdAt.seconds * 1000
        : t.createdAt
    )

    const mesTransacao = `${data.getFullYear()}-${String(
      data.getMonth() + 1
    ).padStart(2, "0")}`

    const filtroTipo =
      tipo === "todas" ? true : t.tipo === tipo

    const filtroMes =
      mes ? mes === mesTransacao : true

    return filtroTipo && filtroMes
  })

  return (
    <div className="historico">
      <header className="historico-header">
        <h1>Histórico</h1>
        <span>
          Todas as movimentações registradas na sua conta
        </span>
      </header>

      {/* Caso 1: conta vazia */}
      {!temTransacoes && (
        <div className="historico-vazio">
          <h2>Nenhuma movimentação ainda</h2>
          <p>
            Quando você adicionar entradas ou saídas,
            elas aparecerão aqui.
          </p>
        </div>
      )}

      {/* Caso 2: tem transações */}
      {temTransacoes && (
        <>
          {/* Filtros */}
          <div className="filtros">
            <select
              value={tipo}
              onChange={e => setTipo(e.target.value)}
            >
              <option value="todas">Todas</option>
              <option value="entrada">Entradas</option>
              <option value="saida">Saídas</option>
            </select>

            <input
              type="month"
              value={mes}
              onChange={e => setMes(e.target.value)}
            />
          </div>

          {/* Caso 3: filtros sem resultado */}
          {transacoesFiltradas.length === 0 && (
            <p className="muted">
              Nenhuma movimentação encontrada com os filtros
              selecionados.
            </p>
          )}

          {/* Lista */}
          <div className="lista">
            {transacoesFiltradas.map(t => (
              <div key={t.id} className="linha">
                <span className={`tipo ${t.tipo}`}>
                  {t.tipo === "entrada" ? "+" : "-"}
                </span>

                <div className="info">
                  <strong>
                    {t.descricao || "Sem descrição"}
                  </strong>
                  <small>
                    {new Date(
                      t.createdAt?.seconds
                        ? t.createdAt.seconds * 1000
                        : t.createdAt
                    ).toLocaleDateString("pt-BR")}
                  </small>
                </div>

                <span className="valor">
                  R$ {t.valor.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Historico
