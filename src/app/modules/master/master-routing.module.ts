import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Branch Components
import { BranchListComponent } from './components/branch/branch-list.component';
import { BranchFormComponent } from './components/branch/branch-form.component';
import { BranchDetailsComponent } from './components/branch/branch-details.component';

// Port Components
import { PortListComponent } from './components/port/port-list.component';
import { PortFormComponent } from './components/port/port-form.component';
import { PortDetailsComponent } from './components/port/port-details.component';

// Country Components
import { CountryListComponent } from './components/country/country-list.component';
import { CountryFormComponent } from './components/country/country-form.component';
import { CountryDetailsComponent } from './components/country/country-details.component';

// State Components
import { StateListComponent } from './components/state/state-list/state-list.component';
import { StateFormComponent } from './components/state/state-form/state-form.component';
import { StateDetailsComponent } from './components/state/state-details/state-details.component';

// Geography Components (Old structure - keeping for backward compatibility)
import { CityListComponent } from './components/geography/city-list.component';

// Currency Components
import { CurrencyListComponent } from './components/currency/currency-list.component';
import { CurrencyFormComponent } from './components/currency/currency-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'branches',
    pathMatch: 'full'
  },
  
  // Branch Routes
  {
    path: 'branches',
    component: BranchListComponent
  },
  {
    path: 'branches/new',
    component: BranchFormComponent
  },
  {
    path: 'branches/:id',
    component: BranchDetailsComponent
  },
  {
    path: 'branches/:id/edit',
    component: BranchFormComponent
  },

  // Port Routes
  {
    path: 'ports',
    component: PortListComponent
  },
  {
    path: 'ports/new',
    component: PortFormComponent
  },
  {
    path: 'ports/:id',
    component: PortDetailsComponent
  },
  {
    path: 'ports/:id/edit',
    component: PortFormComponent
  },

  // Country Routes (New Structure)
  {
    path: 'countries',
    component: CountryListComponent
  },
  {
    path: 'countries/new',
    component: CountryFormComponent
  },
  {
    path: 'countries/:id',
    component: CountryDetailsComponent
  },
  {
    path: 'countries/:id/edit',
    component: CountryFormComponent
  },

  // State Routes (New Structure)
  {
    path: 'states',
    component: StateListComponent
  },
  {
    path: 'states/new',
    component: StateFormComponent
  },
  {
    path: 'states/:id',
    component: StateDetailsComponent
  },
  {
    path: 'states/:id/edit',
    component: StateFormComponent
  },

  // Geography Routes (Old structure for backward compatibility)
  {
    path: 'geography/cities',
    component: CityListComponent
  },

  // Currency Routes
  {
    path: 'currencies',
    component: CurrencyListComponent
  },
  {
    path: 'currencies/new',
    component: CurrencyFormComponent
  },
  {
    path: 'currencies/:id/edit',
    component: CurrencyFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
