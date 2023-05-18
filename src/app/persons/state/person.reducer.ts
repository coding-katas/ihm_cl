import { Person } from '../person';

/* NgRx */
import { createReducer, on } from '@ngrx/store';
import { PersonApiActions, PersonPageActions } from './actions';

// State for this feature (Person)
export interface PersonState {
  showPersonCode: boolean;
  currentPersonId: number | null;
  persons: Person[];
  error: string;
}

const initialState: PersonState = {
  showPersonCode: true,
  currentPersonId: null,
  persons: [],
  error: ''
};

export const personReducer = createReducer<PersonState>(
  initialState,
  on(PersonPageActions.togglePersonCode, (state): PersonState => {
    return {
      ...state,
      showPersonCode: !state.showPersonCode
    };
  }),
  on(PersonPageActions.setCurrentPerson, (state, action): PersonState => {
    return {
      ...state,
      currentPersonId: action.currentPersonId
    };
  }),
  on(PersonPageActions.clearCurrentPerson, (state): PersonState => {
    return {
      ...state,
      currentPersonId: null
    };
  }),
  on(PersonPageActions.initializeCurrentPerson, (state): PersonState => {
    return {
      ...state,
      currentPersonId: 0
    };
  }),
  on(PersonApiActions.loadPersonsSuccess, (state, action): PersonState => {
    return {
      ...state,
      persons: action.persons,
      error: ''
    };
  }),
  on(PersonApiActions.loadPersonsFailure, (state, action): PersonState => {
    return {
      ...state,
      persons: [],
      error: action.error
    };
  }),
  on(PersonApiActions.updatePersonSuccess, (state, action): PersonState => {
    const updatedPersons = state.persons.map(
      item => action.person.id === item.id ? action.person : item);
    return {
      ...state,
      persons: updatedPersons,
      currentPersonId: action.person.id,
      error: ''
    };
  }),
  on(PersonApiActions.updatePersonFailure, (state, action): PersonState => {
    return {
      ...state,
      error: action.error
    };
  }),
  // After a create, the currentPerson is the new person.
  on(PersonApiActions.createPersonSuccess, (state, action): PersonState => {
    return {
      ...state,
      persons: [...state.persons, action.person],
      currentPersonId: action.person.id,
      error: ''
    };
  }),
  on(PersonApiActions.createPersonFailure, (state, action): PersonState => {
    return {
      ...state,
      error: action.error
    };
  }),
  // After a delete, the currentPerson is null.
  on(PersonApiActions.deletePersonSuccess, (state, action): PersonState => {
    return {
      ...state,
      persons: state.persons.filter(person => person.id !== action.personId),
      currentPersonId: null,
      error: ''
    };
  }),
  on(PersonApiActions.deletePersonFailure, (state, action): PersonState => {
    return {
      ...state,
      error: action.error
    };
  })
);
