import { Pipe, PipeTransform } from '@angular/core';
import { Lead, Stage } from '../../services/models';

@Pipe({
  name: 'filterByStage',
  standalone: true
})
export class FilterByStagePipe implements PipeTransform {
  transform(leads: Lead[], stageId: string): Lead[] {
    if (!leads || !stageId) return [];
    return leads.filter(lead => lead.stageId === stageId);
  }
}

@Pipe({
  name: 'currencySum',
  standalone: true
})
export class CurrencySumPipe implements PipeTransform {
  transform(leads: Lead[]): number {
    if (!leads || leads.length === 0) return 0;
    return leads.reduce((sum, lead) => sum + (lead.value || 0), 0);
  }
}

@Pipe({
  name: 'avgProbability',
  standalone: true
})
export class AvgProbabilityPipe implements PipeTransform {
  transform(leads: Lead[]): number {
    if (!leads || leads.length === 0) return 0;
    const sum = leads.reduce((total, lead) => total + (lead.probability || 0), 0);
    return sum / leads.length;
  }
}

@Pipe({
  name: 'findStage',
  standalone: true
})
export class FindStagePipe implements PipeTransform {
  transform(stages: Stage[], stageId: string): Stage | undefined {
    if (!stages || !stageId) return undefined;
    return stages.find(stage => stage.id === stageId);
  }
}
