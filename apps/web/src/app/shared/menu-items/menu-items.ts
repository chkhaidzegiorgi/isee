import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: string;
}

const MENUITEMS = [
  { state: 'visits', name: 'ვიზიტები', type: 'link', icon: 'av_timer' },
  { state: 'patients', name: 'პაციენტები', type: 'link', icon: 'av_timer' },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
