import { Pipe, PipeTransform } from '@angular/core';
import { StatutEnum } from '../../core/models/competence.model';

@Pipe({
  name: 'statut',
})
export class StatutPipe implements PipeTransform {
  transform(statut : StatutEnum): string {
    switch(statut){
      case StatutEnum.AAcquerir : return "À acquérir";
      case StatutEnum.EnCours : return "En cours";
      case StatutEnum.Acquise : return "Acquise";
      default : return "-";
    }
  }
}
