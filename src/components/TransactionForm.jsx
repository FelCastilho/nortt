//Componente responsável pela renderização do formulário de transações (Inputs e Botões)

function TransactionForm({
  valor,
  setValor,
  descricao,
  setDescricao,
  onEntrada,
  onSaida
}) {
  return (
    <div>
      <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />

      <input
        type="text"
        placeholder="Descrição (opcional)"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      <div>
        <button onClick={onEntrada}>+ Entrada</button>
        <button onClick={onSaida}>- Saída</button>
      </div>
    </div>
  )
}

export default TransactionForm
