/* eslint-disable prettier/prettier */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactions {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome, total } =  this.transactions.reduce(
      (acumulator: Balance, element: CreateTransactions) => {

        acumulator.income += element.type === 'income' ? element.value : 0;

        acumulator.outcome += element.type === 'outcome' ? element.value : 0;

        acumulator.total = acumulator.income - acumulator.outcome;

        return acumulator;
      },
      { income: 0, outcome: 0, total: 0},
    );

    return {
      income,
      outcome,
      total
    };
  }

  public create({ title, value, type }: CreateTransactions): Transaction {
    const transactions = new Transaction({ title, value, type });

    this.transactions.push(transactions);

    return transactions;
  }
}

export default TransactionsRepository;
