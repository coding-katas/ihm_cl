import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Person } from '../person';

import { statuses } from '../../shared/statuses';
import { GenericValidator } from '../../shared/validators/generic-validator';
import { NumberValidators } from '../../shared/validators/number.validator';
import { TranslateService } from '@ngx-translate/core';
import { merge, Subscription } from 'rxjs';

@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.scss']
})
export class PersonSearchComponent implements OnInit, OnChanges, OnDestroy {
  pageTitle = "Recherche de personnes";
  statuses = statuses;
  @Input() errorMessage: string;
  @Input() selectedPerson: Person;
  @Output() create = new EventEmitter<Person>();
  @Output() update = new EventEmitter<Person>();
  @Output() delete = new EventEmitter<Person>();
  @Output() clearCurrent = new EventEmitter<void>();
  formSub: Subscription;
  personForm: FormGroup;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder, private translate: TranslateService) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.initValidationMessages();

    // Define an instance of the validator for use with this form
    this.genericValidator = new GenericValidator();
  }

  initValidationMessages(): void {
    this.validationMessages = {
      personContId: {
        minlength: 'ContId doit être au moins 3 caracteres.',
        maxlength: 'ContId ne dépasse pas 50 caracteres.'
      },
      personPID: {
        minlength: 'personPID doit être au moins 3 caracteres.',
        maxlength: 'personPID ne dépasse pas 50 caracteres.'
      },
      contractId: {
        minlength: 'contractId doit être au moins 3 caracteres.',
        maxlength: 'contractId ne dépasse pas 50 caracteres.'
      },      
      name: {
        required: 'Nom de la personne est obligatoire.'
      }
    };
  }

  initPageTitle(person: Person) : void {
    if (person.id === 0) {
      this.pageTitle = this.translate.instant('Add Person');
    } else {
      this.pageTitle = `${this.translate.instant('Edit Person')}: ${person.personContId}`;
    }
  }

  ngOnInit(): void {
    // Define the form group
    this.personForm = this.fb.group({
      personContId: ['', [Validators.minLength(3), Validators.maxLength(50)]],
      personPID: ['', [Validators.minLength(3), Validators.maxLength(50)]],      
      externId: ['', [Validators.minLength(3), Validators.maxLength(50)]],      
      contractId: ['', [Validators.minLength(3), Validators.maxLength(50)]],      
      name: ['', Validators.required]
    });

    // Watch for value changes for validation and translations
    merge(this.translate.onLangChange, this.personForm.valueChanges)
    .subscribe((res) => {
      if (res?.lang) {
        this.initPageTitle(this.selectedPerson);
        this.initValidationMessages();
      }
      this.displayMessage = this.genericValidator.processMessages(this.personForm, this.validationMessages);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // patch form with value from the store
    if (changes.selectedPerson) {
      const person = changes.selectedPerson.currentValue as Person;
      this.displayPerson(person);
    }
  }

  ngOnDestroy(): void {
    if (this.formSub) {
      this.formSub.unsubscribe();
    }
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.personForm, this.validationMessages);
  }

  displayPerson(person: Person | null): void {
    if (person && this.personForm) {
      // Reset the form back to pristine
      this.personForm.reset();

      // Display the appropriate page title
      this.initPageTitle(person);

      // Update the data on the form
      this.personForm.patchValue({
        personContId: person.personContId,
        personPID: person.personPID,
        externId: person.externId,
        contractId: person.contractId,
        contactMean: person.contactMean,
        name: person.name,
        firstName: person.firstName,
        state: person.state 
      });
    }
  }

  cancelEdit(): void {
    // Redisplay the currently selected person
    // replacing any edits made
    this.displayPerson(this.selectedPerson);
  }

  deletePerson(): void {
    if (this.selectedPerson && this.selectedPerson.id) {
        this.delete.emit(this.selectedPerson);
    } else {
      // No need to delete, it was never saved
      this.clearCurrent.emit();
    }
  }

  savePerson(): void {
    if (this.personForm.valid) {
      if (this.personForm.dirty) {
        // Copy over all of the original person properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const person = { ...this.selectedPerson, ...this.personForm.value };

        if (person.id === 0) {
          this.create.emit(person);
        } else {
          this.update.emit(person);
        }
      }
    }
  }

}
