import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeSlider } from 'src/app/_models/home_slider';
import { AlertService } from 'src/app/_services/alert.service';
import { HomeSliderService } from 'src/app/_services/home_slider.service';

@Component({
  selector: 'app-add-slider',
  templateUrl: './add-slider.component.html',
  styleUrls: ['./add-slider.component.css']
})
export class AddSliderComponent implements OnInit {

  isDisabled = false;
  selectedFiles?: FileList;
  currentFileUpload?: HomeSlider;
  percentage = 0;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  constructor(
    private homeSliderService: HomeSliderService,
    private alertService: AlertService,
    fb: FormBuilder,
  ) {
    this.options = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  @ViewChild('fileInput') fileInput: ElementRef | any;
  fileAttr = 'Choose image';


  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.fileAttr = this.selectedFiles[0].name;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.isDisabled = true;
        this.currentFileUpload = new HomeSlider(
          this.options.value.title,
          this.options.value.description,
          file
        );
        this.homeSliderService.pushFileToStorage(this.currentFileUpload).subscribe(
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
      }
    }

  }
}
