import { Pipe, PipeTransform } from '@angular/core';
import { VisibiliteEnum } from '../../core/models/competence.model';

@Pipe({
  name: 'visibilite',
})
export class VisibilitePipe implements PipeTransform {
  transform(visibilite : VisibiliteEnum): string {
    switch(visibilite){
      case VisibiliteEnum.Public : return "Public";
      case VisibiliteEnum.Prive : return "Privé"; 
      default : return "-";
    }
  }
}
