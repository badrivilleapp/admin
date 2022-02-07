import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { OtherProduct } from 'src/app/_models/other_product';
import { AlertService } from 'src/app/_services/alert.service';
import { ProductService } from 'src/app/_services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  searchText = '';
  fileUploads?: any[];
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  options: FormGroup;

  constructor(
    private productService: ProductService,
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
    this.loadAllSliderImage();
  }

  displayedColumns: string[] = ['name', 'action'];

  loadAllSliderImage(): void {
    this.spinner.show();
    this.productService.getOtherProductData().snapshotChanges().pipe(
      map(changes => 
        // store the key 
        changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
      this.spinner.hide();
    });
  }

  deleteFileUpload(fileUpload: OtherProduct): void {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.productService.deleteOtherProductData(fileUpload);
        this.alertService.showSuccess('Deleted successfully.!');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled'
        )
      }
    })
  }

}

