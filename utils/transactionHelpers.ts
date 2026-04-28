import { Transaction, TransactionSummary } from "../types/transaction";

export function getTotalIncome(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getTotalExpense(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getBalance(transactions: Transaction[]): number {
  return getTotalIncome(transactions) - getTotalExpense(transactions);
}

export function getCategoryTotal(
  transactions: Transaction[],
  categoryId: string
): number {
  return transactions
    .filter((t) => t.categoryId === categoryId)
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getTransactionSummary(
  transactions: Transaction[]
): TransactionSummary {
  return {
    totalIncome: getTotalIncome(transactions),
    totalExpense: getTotalExpense(transactions),
    balance: getBalance(transactions),
  };
}

export function findTransactionById(
  transactions: Transaction[],
  id: string
): Transaction | undefined {
  return transactions.find((t) => t.id === id);
}
