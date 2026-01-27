import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore"

import { db } from "../firebase/firebase"


export async function addTransaction(uid, transaction) {
  if (!uid) throw new Error("Usuário não autenticado")

  const ref = collection(db, "users", uid, "transacoes")

  await addDoc(ref, {
    tipo: transaction.tipo, 
    valor: transaction.valor,
    descricao: transaction.descricao || "",
    createdAt: serverTimestamp()
  })
}

export async function getTransactions(uid) {
  if (!uid) throw new Error("Usuário não autenticado")

  const ref = collection(db, "users", uid, "transacoes")

  const q = query(ref, orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}
