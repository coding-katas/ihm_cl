import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PersonService } from '../person.service';
import { MessageService } from 'primeng/api';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PersonPageActions, PersonApiActions } from './actions';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class PersonEffects {
  constructor(
    private actions$: Actions,
    private personService: PersonService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {}

  loadPersons$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PersonPageActions.loadPersons),
      mergeMap(() =>
        this.personService.getPersons().pipe(
          map((persons) =>
            PersonApiActions.loadPersonsSuccess({ persons })
          ),
          catchError((error) =>
            of(PersonApiActions.loadPersonsFailure({ error }))
          )
        )
      )
    );
  });

  updatePerson$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PersonPageActions.updatePerson),
      concatMap((action) =>
        this.personService.updatePerson(action.person).pipe(
          tap((person) =>  this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('Success'),
            detail:  `${person.personContId} ${this.translate.instant('updated successfully')}`
          })),
          map((person) => PersonApiActions.updatePersonSuccess({ person })),
          catchError((error) =>
            of(PersonApiActions.updatePersonFailure({ error }))
          )
        )
      )
    );
  });

  createPerson$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PersonPageActions.createPerson),
      concatMap((action) =>
        this.personService.createPerson(action.person).pipe(
          tap((person) =>  this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('Success'),
            detail:  `${person.personContId} ${this.translate.instant('created successfully')}`
          })),
          map((person) => PersonApiActions.createPersonSuccess({ person })),
          catchError((error) =>
            of(PersonApiActions.createPersonFailure({ error }))
          )
        )
      )
    );
  });

  deletePerson$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PersonPageActions.deletePerson),
      mergeMap((action) =>
        this.personService.deletePerson(action.personId).pipe(
          tap(() =>  this.messageService.add({
            severity: this.translate.instant('success'),
            summary: 'Success',
            detail: this.translate.instant('Deleted successfully')
          })),
          map(() =>
            PersonApiActions.deletePersonSuccess({
              personId: action.personId,
            })
          ),
          catchError((error) =>
            of(PersonApiActions.deletePersonFailure({ error }))
          )
        )
      )
    );
  });
}
