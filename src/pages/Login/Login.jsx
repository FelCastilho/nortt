import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase/firebase"
import { useNavigate, Link } from "react-router-dom"
import "./style.css"

function Login() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    setErro("")

    try {
      await signInWithEmailAndPassword(auth, email, senha)
      navigate("/")
    } catch (err) {
      setErro("Email ou senha inválidos")
    }
  }

  return (
    <div className="auth">
      <form className="auth-card" onSubmit={handleLogin}>
        <h1>Entrar</h1>

        {erro && <p className="erro">{erro}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>

        <p className="link">
          Não tem conta? <Link to="/register">Criar conta</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
