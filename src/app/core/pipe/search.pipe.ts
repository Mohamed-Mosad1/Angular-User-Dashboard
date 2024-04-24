import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(users: any[], term: string): any[] {
    if (!users || !term) {
      return users;
    }
    return users.filter(user => user.id.toString().toLowerCase().includes(term.toLowerCase()));
  }

}
