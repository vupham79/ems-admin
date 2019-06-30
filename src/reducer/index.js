import { combineReducers } from 'redux';
import user from './user';
import company from './company';
import round from './round.js';
import roundType from './roundType';
import shareAccount from './shareAccount';
import shareholder from './shareholder';
import shareType from './sharetype';
import transaction from './transaction';
import transactionEntry from './transactionEntry';

export default combineReducers({
  user,
  company,
  round,
  roundType,
  shareAccount,
  shareholder,
  shareType,
  transaction,
  transactionEntry,
});