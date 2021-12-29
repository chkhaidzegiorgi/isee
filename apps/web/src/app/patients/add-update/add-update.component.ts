import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { PatientsService } from '../patients.service';
import { AddUpdateFormBuilder } from './add-update.builder';

@Component({
  selector: 'isee-add-update',
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUpdateComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  constructor(
    private fb: AddUpdateFormBuilder,
    private snakBack: MatSnackBar,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private service: PatientsService
  ) {}

  ngOnInit(): void {
    const { id } = this.route.snapshot.queryParams;
    if (id) {
      this.service.get(id).subscribe((patient) => {
        this.id = id;
        this.form = this.fb.build(patient);
        this.cdr.markForCheck();
      });
    } else {
      this.form = this.fb.build();
      this.cdr.markForCheck();
    }
  }

  onSave(): void {
    const formValues = this.form.value;
    let obs$: Observable<any>;
    if (this.id) {
      obs$ = this.service.modify(this.id, formValues);
    } else {
      obs$ = this.service.add(formValues);
    }

    obs$
      .subscribe(
        (x: any) => {
          console.log(x);
          this.router.navigate(['./']);
          this.snakBack.open('მონაცემები წარმატებით შეინახა', 'დახურვა');
        },
        (error) => {
          this.snakBack.open('დაფისქირდა შეცდომა', 'დახურვა')
          console.log(error);
        }
      )
  }
}
