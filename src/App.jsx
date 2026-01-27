import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"

import MainLayout from "./layouts/MainLayout"

// Pages
import Inicio from "./pages/Inicio/Inicio"
import Calculadora from "./pages/calculadora/Calculadora"
import Historico from "./pages/Historico/Historico"
import Perfil from "./pages/Perfil/Perfil"
import Movimentacoes from "./pages/Movimentacoes/Movimentacoes"

// Modal
import TransactionModal from "./components/Modal/TransactionModal"

function App() {
  const [modalAberto, setModalAberto] = useState(false)

  const [transacoes, setTransacoes] = useState([
    { tipo: "entrada", valor: 150, descricao: "Mesada", data: "20/01" },
    { tipo: "saida", valor: 12, descricao: "Uber", data: "22/01" },
    { tipo: "entrada", valor: 24, descricao: "Almoço", data: "23/01" },
  ])

  const saldo = transacoes.reduce((total, t) => {
    return t.tipo === "entrada" ? total + t.valor : total - t.valor
  }, 0)

  function adicionarTransacao(nova) {
    setTransacoes(prev => [...prev, nova])
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <Inicio
                saldo={saldo}
                transacoes={transacoes}
                abrirModal={() => setModalAberto(true)}
              />
            }
          />

          <Route
            path="/historico"
            element={<Historico transacoes={transacoes} />}
          />

          <Route
            path="/movimentacoes"
            element={<Movimentacoes onAdd={adicionarTransacao} />}
          />

          <Route path="/calculadora" element={<Calculadora />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>
      </Routes>

      {modalAberto && (
        <TransactionModal
          onClose={() => setModalAberto(false)}
          onAdd={adicionarTransacao}
        />
      )}
    </BrowserRouter>
  )
}

export default App
