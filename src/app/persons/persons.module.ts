import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { personReducer } from './state/person.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PersonEffects } from './state/person.effects';
import { PersonShellComponent } from './person-shell/person-shell.component';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonSearchComponent } from './person-search/person-search.component';

import { PrimeNgModule } from '../primeng.module';
import { TranslateModule } from '@ngx-translate/core';

const personRoutes: Routes = [{ path: '', component: PersonShellComponent }];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(personRoutes),
    StoreModule.forFeature('persons', personReducer),
    EffectsModule.forFeature([PersonEffects]),
    PrimeNgModule,
    TranslateModule
  ],
  declarations: [
    PersonShellComponent,
    PersonListComponent,
    PersonSearchComponent,
  ],
})
export class PersonsModule {}
