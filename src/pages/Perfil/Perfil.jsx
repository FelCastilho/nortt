import { useEffect, useState } from "react"
import { signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "../../firebase/firebase"
import { useNavigate } from "react-router-dom"

import "./style.css"

function Perfil() {
  const navigate = useNavigate()
  const user = auth.currentUser

  const [dados, setDados] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregarPerfil() {
      if (!user) return

      const ref = doc(db, "users", user.uid)
      const snap = await getDoc(ref)

      if (snap.exists()) {
        setDados(snap.data())
      }

      setLoading(false)
    }

    carregarPerfil()
  }, [user])

  function logout() {
    signOut(auth)
    navigate("/login")
  }

  if (loading) {
    return <p className="perfil-loading">Carregando perfil...</p>
  }

  return (
    <div className="perfil-container">
      <header className="perfil-header">
        <h1>Meu perfil</h1>
        <p>Gerencie suas informações pessoais</p>
      </header>

      <section className="perfil-section">
        <h2>Informações pessoais</h2>

        <div className="perfil-grid">
          <div className="perfil-item">
            <span>Nome</span>
            <strong>{dados?.nome}</strong>
          </div>

          <div className="perfil-item">
            <span>Sobrenome</span>
            <strong>{dados?.sobrenome}</strong>
          </div>

          <div className="perfil-item">
            <span>Idade</span>
            <strong>{dados?.idade} anos</strong>
          </div>
        </div>
      </section>

      <section className="perfil-section">
        <h2>Conta</h2>

        <div className="perfil-grid">
          <div className="perfil-item wide">
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>

          <div className="perfil-item wide">
            <span>ID do usuário</span>
            <strong className="uid">{user.uid}</strong>
          </div>
        </div>
      </section>

      <section className="perfil-actions">
        <button onClick={logout} className="btn-logout">
          Sair da conta
        </button>
      </section>
    </div>
  )
}

export default Perfil
