import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
// import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    return response.status(200).json({
      transactions,
      balance,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    const balance = transactionsRepository.getBalance();

    if(type === 'outcome'){
      console.log(`balance: ${balance.total}, value: ${value}`);
      if(balance.total < value){
        console.log("true");
        return response.status(400).json({
          error: "not enough balance"
        });
      }
    }

    const transaction:Transaction 
      = transactionsRepository.create(title, value, type);

    return response.status(200).json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
