import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"

import { auth } from "./firebase/firebase"
import { getTransactions } from "./services/transactions"

import MainLayout from "./layouts/MainLayout"

// Pages
import Inicio from "./pages/Inicio/Inicio"
import Calculadora from "./pages/calculadora/Calculadora"
import Historico from "./pages/Historico/Historico"
import Perfil from "./pages/Perfil/Perfil"
import Movimentacoes from "./pages/Movimentacoes/Movimentacoes"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"

// Modal
import TransactionModal from "./components/Modal/TransactionModal"

function App() {
  const [modalAberto, setModalAberto] = useState(false)
  const [transacoes, setTransacoes] = useState([])
  const [loading, setLoading] = useState(true)

  async function carregarTransacoes() {
    const user = auth.currentUser
    if (!user) return

    setLoading(true)
    const data = await getTransactions(user.uid)
    setTransacoes(data)
    setLoading(false)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        carregarTransacoes()
      } else {
        setTransacoes([])
      }
    })

    return () => unsubscribe()
  }, [])

  const saldo = transacoes.reduce((total, t) => {
    return t.tipo === "entrada"
      ? total + t.valor
      : total - t.valor
  }, 0)

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* App */}
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <Inicio
                saldo={saldo}
                transacoes={transacoes}
                loading={loading}
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
            element={<Movimentacoes />}
          />

          <Route path="/calculadora" element={<Calculadora />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>
      </Routes>

      {modalAberto && (
        <TransactionModal
          onClose={() => setModalAberto(false)}
          onSaved={carregarTransacoes}
        />
      )}
    </BrowserRouter>
  )
}

export default App
