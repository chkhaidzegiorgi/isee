import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Paging, Visit } from '@isee/api-interfaces';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { VisitsService } from '../visits.service';

@Component({
  selector: 'isee-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  search = new FormControl();

  searchValue = '';
  paging: Paging = {
    page: 0,
    take: 10,
  };
  listLength = 0;

  displayedColumns: string[] = [
    'id',
    'fullname',
    'doctorName',
    'price',
    'date',
  ];
  list: Visit[] = [];

  constructor(private service: VisitsService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.listenFilter();
    this.load();
  }

  load(): void {
    this.service.getList(this.searchValue, this.paging).subscribe((res) => {
      this.list = res.records;
      this.listLength = res.count;
      this.cdr.markForCheck();
    });
  }

  listenFilter(): void {
    this.search.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((val: string) => {
        this.handleFilterChange(val);
      });
  }

  handleFilterChange(searchValue: string) {
    this.searchValue = searchValue;
    this.load();
  }

  handlePageChange($event: PageEvent) {
    const { pageIndex, pageSize } = $event;
    this.paging = {
      ...this.paging,
      page: pageIndex,
      take: pageSize,
    };
    this.load();
  }
}
