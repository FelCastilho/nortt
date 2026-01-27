import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"

import { auth, db } from "../../firebase/firebase"
import "./style.css"

function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    idade: "",
    senha: "",
    confirmarSenha: "",
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (form.senha !== form.confirmarSenha) {
      alert("As senhas não coincidem")
      return
    }

    try {
      // 1️⃣ cria o usuário no Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.senha
      )

      const user = userCredential.user

      // 2️⃣ cria o documento no Firestore
      await setDoc(doc(db, "users", user.uid), {
        nome: form.nome,
        sobrenome: form.sobrenome,
        email: form.email,
        idade: Number(form.idade),
        createdAt: serverTimestamp(),
      })

      // 3️⃣ redireciona
      navigate("/")

    } catch (error) {
      alert("Erro ao criar conta: " + error.message)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Criar conta</h1>
        <p>Comece a organizar seu dinheiro com a Nortt</p>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={form.nome}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="sobrenome"
              placeholder="Sobrenome"
              value={form.sobrenome}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="number"
            name="idade"
            placeholder="Idade"
            value={form.idade}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmarSenha"
            placeholder="Confirmar senha"
            value={form.confirmarSenha}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-primary">
            Criar conta
          </button>
        </form>

        <span className="auth-footer">
          Já tem uma conta? <Link to="/login">Entrar</Link>
        </span>
      </div>
    </div>
  )
}

export default Register
