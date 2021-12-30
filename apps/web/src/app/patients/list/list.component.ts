import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Paging, Patient } from '@isee/api-interfaces';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { PatientsService } from '../patients.service';

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
    'id_number',
    'birthday',
    'branch',
    'address',
    'disease',
  ];
  list: Patient[] = [];

  constructor(
    private service: PatientsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.listenFilter();
    this.load();
  }

  load() {
    this.service.getList(this.searchValue, this.paging).subscribe((res) => {
      this.list = res.records;
      this.listLength = res.count;
      this.cdr.markForCheck();
      console.log(res);
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
