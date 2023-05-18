import { Person } from '../../person';

/* NgRx */
import { createAction, props } from '@ngrx/store';

export const loadPersonsSuccess = createAction(
  '[Person API] Load Success',
  props<{ persons: Person[] }>()
);

export const loadPersonsFailure = createAction(
  '[Person API] Load Fail',
  props<{ error: string }>()
);

export const updatePersonSuccess = createAction(
  '[Person API] Update Person Success',
  props<{ person: Person }>()
);

export const updatePersonFailure = createAction(
  '[Person API] Update Person Fail',
  props<{ error: string }>()
);

export const createPersonSuccess = createAction(
  '[Person API] Create Person Success',
  props<{ person: Person }>()
);

export const createPersonFailure = createAction(
  '[Person API] Create Person Fail',
  props<{ error: string }>()
);

export const deletePersonSuccess = createAction(
  '[Person API] Delete Person Success',
  props<{ personId: number }>()
);

export const deletePersonFailure = createAction(
  '[Person API] Delete Person Fail',
  props<{ error: string }>()
);
