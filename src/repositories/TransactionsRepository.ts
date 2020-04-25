import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];
  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = { income:0, outcome:0, total:0 };
  }

  public all(): Transaction[] {    
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public create(title:string, value:number, type:'income'|'outcome'): Transaction {
    const transaction = new Transaction({title, value, type});

    if( type === 'income' )
      this.balance.income+= transaction.value;
    if( type === 'outcome' )
      if(this.balance.total >= transaction.value){
        this.balance.outcome+= transaction.value;
      }
      
    this.transactions.push(transaction);
    this.balance.total = this.balance.income - this.balance.outcome;

    return transaction;
  }
}

export default TransactionsRepository;
