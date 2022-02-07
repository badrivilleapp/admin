import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OtherProduct } from 'src/app/_models/other_product';
import { AlertService } from 'src/app/_services/alert.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  isDisabled = false;
  selectedFiles?: FileList;
  currentFileUpload?: OtherProduct;
  percentage = 0;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  constructor(
    private productService: ProductService,
    private alertService: AlertService,
    fb: FormBuilder,
  ) {
    this.options = fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required]
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
        this.currentFileUpload = new OtherProduct(
          this.options.value.title,
          this.options.value.price,
          file
        );
        this.productService.pushFileToStorage(this.currentFileUpload).subscribe(
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

