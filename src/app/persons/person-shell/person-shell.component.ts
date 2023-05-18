import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { Person } from '../person';

/* NgRx */
import { Store } from '@ngrx/store';
import { State, getShowPersonCode, getCurrentPerson, getPersons, getError } from '../state';

import { PersonPageActions } from '../state/actions';

import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-person-shell',
  templateUrl: './person-shell.component.html',
  styleUrls: ['./person-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonShellComponent implements OnInit {
  displayCode$: Observable<boolean>;
  selectedPerson$: Observable<Person>;
  persons$: Observable<Person[]>;
  errorMessage$: Observable<string>;

  constructor(
    private store: Store<State>,
    private confirmationService: ConfirmationService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {

    // Do NOT subscribe here because it uses an async pipe
    // This gets the initial values until the load is complete.
    this.persons$ = this.store.select(getPersons);

    // Do NOT subscribe here because it uses an async pipe
    this.errorMessage$ = this.store.select(getError);

    this.store.dispatch(PersonPageActions.loadPersons());

    // Do NOT subscribe here because it uses an async pipe
    this.selectedPerson$ = this.store.select(getCurrentPerson);

    // Do NOT subscribe here because it uses an async pipe
    this.displayCode$ = this.store.select(getShowPersonCode);
  }

  checkChanged(): void {
    this.store.dispatch(PersonPageActions.togglePersonCode());
  }

  newPerson(): void {
    this.store.dispatch(PersonPageActions.initializeCurrentPerson());
  }

  personSelected(person: Person): void {
    this.store.dispatch(PersonPageActions.setCurrentPerson({ currentPersonId: person.id }));
  }

  deletePerson(person: Person): void {
    this.confirmationService.confirm({
      // message: `Are you sure you want to delete the selected (${person.personContId}) person?`,
      message: this.translate.instant('Are you sure you want to delete the selected person', {value: person.personContId}),
      header: this.translate.instant('Confirm'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translate.instant('Yes'),
      rejectLabel: this.translate.instant('No'),
      accept: () => {
        this.store.dispatch(PersonPageActions.deletePerson({ personId: person.id }));
      }
    });
  }

  clearPerson(): void {
    this.store.dispatch(PersonPageActions.clearCurrentPerson());
  }

  savePerson(person: Person): void {
    this.store.dispatch(PersonPageActions.createPerson({ person }));
  }

  updatePerson(person: Person): void {
    this.store.dispatch(PersonPageActions.updatePerson({ person }));
  }

}
