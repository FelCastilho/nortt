//Componente responsável pela renderização da lista de transações

function TransactionList({ transacoes }) {
  return (
    <ul>
      {transacoes.map((t, index) => (
        <li
          key={index}
          style={{ color: t.tipo === "entrada" ? "green" : "red" }}
        >
          {t.tipo === "entrada" ? "+" : "-"} R$ {t.valor} —{" "}
          {t.descricao || "Sem descrição"}
        </li>
      ))}
    </ul>
  )
}

export default TransactionList
