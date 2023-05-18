import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../person';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent  {
  @Input() errorMessage: string;
  @Input() persons: Person[];
  @Input() displayCode: boolean;
  @Input() selectedPerson: Person;
  @Output() displayCodeChanged = new EventEmitter<void>();
  @Output() initializeNewPerson = new EventEmitter<void>();
  @Output() personWasSelected = new EventEmitter<Person>();

  checkChanged(): void {
    this.displayCodeChanged.emit();
  }

  newPerson(): void {
    this.initializeNewPerson.emit();
  }

  personSelected(person: Person | null): void {
    if (person) {
      this.personWasSelected.emit(person);
    } else {
      this.newPerson();
    }
  }

}
