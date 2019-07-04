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
import shareholderTypes from './shareholderTypes';
import userAccounts from './userAccount';

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
  shareholderTypes,
  userAccounts,
});