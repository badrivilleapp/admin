import { Pipe, PipeTransform } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Pipe({
  name: 'searchTitle',
  pure: false
})
export class SearchTitlePipe implements PipeTransform {

  private titlecasePipe: TitleCasePipe;

  constructor() {
    this.titlecasePipe = new TitleCasePipe(); // pass the current locale as the argument
  }

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    return items.filter(it => {
      //convert serachText to titlecase
      return this.titlecasePipe.transform(it.title).includes(this.titlecasePipe.transform(searchText));
    });
  }

}