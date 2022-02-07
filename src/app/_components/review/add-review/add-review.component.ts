import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/_services/alert.service';
import { CustomerReviewService } from 'src/app/_services/review.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  reviewList = [];
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  percentage = 0;

  isDisabled = false;
  //for rest file input after upload.
  @ViewChild('image') image: ElementRef | any;
  @ViewChild('icon') icon: ElementRef | any;

  constructor(
    fb: FormBuilder,
    private alertService: AlertService,
    private reviewService: CustomerReviewService
  ) {
    this.options = fb.group({
      name: ['', Validators.required],
      place: ['', Validators.required],
      description: ['', Validators.required],
      flag: ['', Validators.required],
    });
  }

  ngOnInit(): void { }


  // convenience getter for easy access to form fields
  get f() { return this.options.controls; }

  createCustomerReview() {
    this.isDisabled = true;
    this.percentage = 50;
    this.reviewService.saveReviewData({
      'name': this.options.value.name,
      'place': this.options.value.place,
      'description': this.options.value.description,
      'flag': this.options.value.flag
    })
    this.percentage = 100;
    this.options.reset();
    this.alertService.showSuccess('Added successfully.!');
    this.isDisabled = false;
  }

}
