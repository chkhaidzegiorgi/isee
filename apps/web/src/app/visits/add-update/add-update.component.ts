import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor, ListResult, Patient } from '@isee/api-interfaces';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  startWith,
  tap,
} from 'rxjs';
import { PatientsService } from '../../patients/patients.service';
import { DoctorsService } from '../../services/doctors.service';
import { mergeDates } from '../../utils/date.utils';
import { VisitsService } from '../visits.service';
import { AddUpdateFormBuilder } from './add-update.builder';

@Component({
  selector: 'isee-add-update',
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AddUpdateComponent implements OnInit {
  form!: FormGroup;
  id!: string;

  autocomplete_value = '';
  doctors$!: Observable<Doctor[]>;
  patients: Patient[] = [];

  constructor(
    private fb: AddUpdateFormBuilder,
    private snakBack: MatSnackBar,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private service: VisitsService,
    private doctorsService: DoctorsService,
    private patientService: PatientsService
  ) {}

  ngOnInit(): void {
    this.doctors$ = this.doctorsService.getList();
    this.loadPatients();

    const { id } = this.route.snapshot.queryParams;
    if (id) {
      this.service.get(id).subscribe((patient) => {
        this.id = id;
        this.form = this.fb.build(patient);
        this.listenAutoCompletes();
        this.cdr.markForCheck();
      });
    } else {
      this.form = this.fb.build();
      this.listenAutoCompletes();
      this.cdr.markForCheck();
    }
  }

  displayFn(patient: Patient): string {
    return patient ? `${patient.firstname} ${patient.lastname}` : '';
  }

  listenAutoCompletes(): void {
    const patientInput = this.form.get('patient');
    if (patientInput) {
      patientInput.valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          filter((value) => typeof value === 'string')
        )
        .subscribe((value) => {
          console.log(value);
          this.autocomplete_value = value;
          this.loadPatients();
        });
    }
  }

  loadPatients(): void {
    this.patientService.getList(this.autocomplete_value).subscribe((res) => {
      this.patients = res.records;
      this.cdr.markForCheck();
    });
  }

  onSave(): void {
    const formValues = { ...this.form.value };

    if (formValues.visit_time) {
      console.log(formValues);
      const changedDate = mergeDates(
        new Date(formValues.visit_date),
        new Date(formValues.visit_time)
      );
      formValues.visit_date = changedDate;
      delete formValues.visit_time;
    }

    let obs$: Observable<any>;
    if (this.id) {
      obs$ = this.service.modify(this.id, formValues);
    } else {
      obs$ = this.service.add(formValues);
    }

    obs$.subscribe(
      (x: any) => {
        console.log(x);
        this.router.navigate(['./visits']);
        this.snakBack.open('მონაცემები წარმატებით შეინახა', 'დახურვა');
      },
      (error) => {
        this.snakBack.open('დაფისქირდა შეცდომა', 'დახურვა');
        console.log(error);
      }
    );
  }
}
