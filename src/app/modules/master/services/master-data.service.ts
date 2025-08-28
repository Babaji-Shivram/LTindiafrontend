import { Injectable } from '@angular/core';
import { BranchService } from './branch.service';
import { PortService } from './port.service';
import { GeographyService } from './geography.service';
import { CurrencyService } from './currency.service';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {
  constructor(
    private branchService: BranchService,
    private portService: PortService,
    private geographyService: GeographyService,
    private currencyService: CurrencyService
  ) {}

  // Expose all services through this central service
  get branches() {
    return this.branchService;
  }

  get ports() {
    return this.portService;
  }

  get geography() {
    return this.geographyService;
  }

  get currencies() {
    return this.currencyService;
  }
}
