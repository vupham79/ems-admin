// Default Layout
import DefaultLayout from '../layout';

// Route Views
import View from '../views';

export default [
  {
    path: "/",
    exact: true,
    component: View.LoginView,
  },
  {
    path: "/shareholder",
    layout: DefaultLayout,
    component: View.ShareholdersView,
  },
  {
    path: "/shareType",
    layout: DefaultLayout,
    component: View.ShareTypesView,
  },
  {
    path: "/shareAccount",
    layout: DefaultLayout,
    component: View.ShareAccountView,
  },
  {
    path: "/transaction",
    layout: DefaultLayout,
    component: View.TransactionsView,
  },
  {
    path: "/user",
    layout: DefaultLayout,
    component: View.UserView,
  },
  {
    path: "/company",
    layout: DefaultLayout,
    component: View.CompanyView,
  },
  {
    path: "/round",
    layout: DefaultLayout,
    component: View.RoundView,
  },
  {
    path: "/transactionEntry",
    layout: DefaultLayout,
    component: View.TransactionEntryView,
  },
  {
    path: '*',
    component: View.NotFoundView,
  }
];