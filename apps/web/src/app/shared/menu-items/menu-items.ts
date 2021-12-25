import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: string;
}

const MENUITEMS = [
  { state: 'patients', name: 'Patients', type: 'link', icon: 'av_timer' },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
