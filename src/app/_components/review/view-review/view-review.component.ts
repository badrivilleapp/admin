import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { AlertService } from 'src/app/_services/alert.service';
import { CustomerReviewService } from 'src/app/_services/review.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-review',
  templateUrl: './view-review.component.html',
  styleUrls: ['./view-review.component.css']
})
export class ViewReviewComponent implements OnInit {

  searchText = '';
  reviewList = [];
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  options: FormGroup;

  constructor(
    private reviewService: CustomerReviewService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    fb: FormBuilder,
  ) {
    this.options = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAllReviews();
  }

  loadAllReviews(): void {
    this.spinner.show();
    this.reviewService.getReviewData().snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      )
    ).subscribe(res => {
      res.map((v) => {
        let record = {
          'key': v.key,
          'description': v.description,
          'name': v.name,
          'title': v.place,
          'flag': v.flag
        }
        this.reviewList.push(record);
      })
      this.spinner.hide();
    });
  }

  deleteReview(key: string): void {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.reviewService.deleteReviewData(key);
        this.alertService.showSuccess('Deleted successfully.!');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled'
        )
      }
    })
  }

}