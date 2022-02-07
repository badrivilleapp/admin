import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Activity } from 'src/app/_models/activity';
import { ActivityService } from 'src/app/_services/activity.service';
import { AlertService } from 'src/app/_services/alert.service';
import { CompressImageService } from 'src/app/_services/compress-image.service';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  selectedImage?: any;
  selectedIcon?: FileList;
  currentFileUpload?: Activity;
  percentage = 0;
  activityFile: File | null;
  activityIcon: File | null;
  isDisabled = false;
  //for rest file input after upload.
  @ViewChild('image') image: ElementRef | any;
  @ViewChild('icon') icon: ElementRef | any;

  bannerColor = [
    { 'class': 'green_color', 'value': 'Green' },
    { 'class': 'purple_color', 'value': 'Purple' },
    { 'class': 'blue_color', 'value': 'Blue' },
    { 'class': 'orange_color', 'value': 'Orange' },
    { 'class': 'red_color', 'value': 'Red' },
    { 'class': 'yellow_color', 'value': 'Yellow' }
  ];

  pageLink = [
    { 'path': 'about-us', 'name': 'About us' },
    { 'path': 'contact-us', 'name': 'Contact us' },
    { 'path': 'equipiment-hire', 'name': 'Equipiment hire' },
    { 'path': 'homestay', 'name': 'Homestay' },
    { 'path': 'motor-cycle-tour', 'name': 'Motor cycle tour' },
    { 'path': 'mountain-biking', 'name': 'Mountain biking' },
    { 'path': 'nature-camping', 'name': 'Nature camping' },
    { 'path': 'resorts', 'name': 'Resorts' },
    { 'path': 'skiing', 'name': 'Skiing' },
    { 'path': 'spiritual-tour', 'name': 'Spiritual tour' },
    { 'path': 'trekking', 'name': 'Trekking' },
    { 'path': 'village-tour', 'name': 'Village tour' },
    { 'path': 'wildlife-safari', 'name': 'Wildlife safari' },
    { 'path': 'yoga-camp-at-himlaya', 'name': 'Yoga camp' },
  ]

  constructor(
    fb: FormBuilder,
    private alertService: AlertService,
    private activityService: ActivityService,
    private compressImage: CompressImageService
  ) {
    this.options = fb.group({
      title: ['', Validators.required],
      banner_name: ['', Validators.required],
      location: ['', Validators.required],
      banner_color: ['', Validators.required],
      path: ['', Validators.required],
      image: [null],
      icon: [null],
    });
  }

  ngOnInit(): void { }

  fileAttr = 'Choose image';
  iconAttr = 'Choose icon';

  // convenience getter for easy access to form fields
  get f() { return this.options.controls; }

  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {

      let image: File = imgFile.target.files[0];

      this.compressImage.compress(image)
        .pipe(take(1))
        .subscribe(compressedImage => {
          this.selectedImage = compressedImage;
          this.fileAttr = this.selectedImage.name;
          this.options.patchValue({
            image: this.selectedImage
          });
        })
    }
  }

  uploadIconEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.selectedIcon = imgFile.target.files;
      this.iconAttr = this.selectedIcon[0].name;
      this.options.patchValue({
        icon: this.selectedIcon
      });
    }
  }

  async createActivity(): Promise<any> {
    if (this.options.invalid) {
      return;
    }
    this.isDisabled = true;
    if (this.selectedImage) {
      this.activityFile = this.selectedImage;
      this.selectedImage = undefined;

      this.activityIcon = this.selectedIcon.item(0);
      this.selectedIcon = undefined;

      if (this.activityFile) {
        this.currentFileUpload = new Activity(
          this.options.value.title,
          this.options.value.banner_name,
          this.options.value.location,
          this.options.value.banner_color,
          this.options.value.path,
          this.activityFile,
          this.activityIcon
        );
        (await this.activityService.pushFileToStorage(this.currentFileUpload)).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
            if (this.percentage == 100) {
              this.alertService.showSuccess('Added successfully.!');
              this.options.reset();
              this.isDisabled = false;
            }
          },
          error => {
            console.log(error);
            this.alertService.showError('Failed, please try again.!');
          }
        );
      } else {
        this.alertService.validateFieldError;
      }
    }

  }

}