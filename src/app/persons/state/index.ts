import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { PersonState } from './person.reducer';

// Extends the app state to include the person feature.
// This is required because persons are lazy loaded.
// So the reference to PersonState cannot be added to app.state.ts directly.
export interface State extends AppState.State {
    persons: PersonState;
}

// Selector functions
const getPersonFeatureState = createFeatureSelector<PersonState>('persons');

export const getShowPersonCode = createSelector(
    getPersonFeatureState,
    state => state.showPersonCode
);

export const getCurrentPersonId = createSelector(
    getPersonFeatureState,
    state => state.currentPersonId
);

export const getCurrentPerson = createSelector(
    getPersonFeatureState,
    getCurrentPersonId,
    (state, currentPersonId) => {
        if (currentPersonId === 0) {
            return {
                id: 0,
                personContId: '',
                personPID: '',
                externId: '',
                contractId: '',
                contactMean: '',
                name: '',
                firstName: '',
                state: 'active'
            };
        } else {
            return currentPersonId ? state.persons.find(p => p.id === currentPersonId) : null;
        }
    }
);

export const getPersons = createSelector(
    getPersonFeatureState,
    state => [...state.persons]
);

export const getError = createSelector(
    getPersonFeatureState,
    state => state.error
);
