import { Person } from '../../person';

/* NgRx */
import { createAction, props } from '@ngrx/store';

export const togglePersonCode = createAction(
  '[Person Page] Toggle Person Code'
);

export const setCurrentPerson = createAction(
  '[Person Page] Set Current Person',
  props<{ currentPersonId: number }>()
);

export const clearCurrentPerson = createAction(
  '[Person Page] Clear Current Person'
);

export const initializeCurrentPerson = createAction(
  '[Person Page] Initialize Current Person'
);

export const loadPersons = createAction(
  '[Person Page] Load'
);

export const updatePerson = createAction(
  '[Person Page] Update Person',
  props<{ person: Person }>()
);

export const createPerson = createAction(
  '[Person Page] Create Person',
  props<{ person: Person }>()
);

export const deletePerson = createAction(
  '[Person Page] Delete Person',
  props<{ personId: number }>()
);
