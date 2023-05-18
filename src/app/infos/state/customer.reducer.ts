import { Customer } from '../customer';

/* NgRx */
import { createReducer, on } from '@ngrx/store';
import { CustomerApiActions, CustomerPageActions } from './actions';

// State for this feature (Customer)
export interface CustomerState {
  currentCustomerId: number | null;
  infos: Customer[];
  error: string;
}

const initialState: CustomerState = {
  currentCustomerId: null,
  infos: [],
  error: ''
};

export const customerReducer = createReducer<CustomerState>(
  initialState,
  on(CustomerPageActions.setCurrentCustomer, (state, action): CustomerState => {
    return {
      ...state,
      currentCustomerId: action.currentCustomerId
    };
  }),
  on(CustomerPageActions.clearCurrentCustomer, (state): CustomerState => {
    return {
      ...state,
      currentCustomerId: null
    };
  }),
  on(CustomerPageActions.initializeCurrentCustomer, (state): CustomerState => {
    return {
      ...state,
      currentCustomerId: 0
    };
  }),
  on(CustomerApiActions.loadCustomersSuccess, (state, action): CustomerState => {
    return {
      ...state,
      infos: action.infos,
      error: ''
    };
  }),
  on(CustomerApiActions.loadCustomersFailure, (state, action): CustomerState => {
    return {
      ...state,
      infos: [],
      error: action.error
    };
  }),
  on(CustomerApiActions.updateCustomerSuccess, (state, action): CustomerState => {
    const updatedCustomers = state.infos.map(
      c => action.customer.id === c.id ? action.customer : c);
    return {
      ...state,
      infos: updatedCustomers,
      currentCustomerId: action.customer.id,
      error: ''
    };
  }),
  on(CustomerApiActions.updateCustomerFailure, (state, action): CustomerState => {
    return {
      ...state,
      error: action.error
    };
  }),
  // After a create, the currentCustomer is the new Customer.
  on(CustomerApiActions.createCustomerSuccess, (state, action): CustomerState => {
    return {
      ...state,
      infos: [...state.infos, action.customer],
      currentCustomerId: action.customer.id,
      error: ''
    };
  }),
  on(CustomerApiActions.createCustomerFailure, (state, action): CustomerState => {
    return {
      ...state,
      error: action.error
    };
  }),
  // After a delete, the currentCustomer is null.
  on(CustomerApiActions.deleteCustomerSuccess, (state, action): CustomerState => {
    return {
      ...state,
      infos: state.infos.filter(customer => customer.id !== action.customerId),
      currentCustomerId: null,
      error: ''
    };
  }),
  on(CustomerApiActions.deleteCustomerFailure, (state, action): CustomerState => {
    return {
      ...state,
      error: action.error
    };
  })
);
