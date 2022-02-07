import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { Activity } from 'src/app/_models/activity';
import { ActivityService } from 'src/app/_services/activity.service';
import { AlertService } from 'src/app/_services/alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.css']
})
export class ViewActivityComponent implements OnInit {

  searchText = '';
  fileUploads?: any[];
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  options: FormGroup;

  constructor(
    private activityService: ActivityService,
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
    this.loadAllActivityList();
  }

  displayedColumns: string[] = ['name', 'action'];

  loadAllActivityList(): void {
    this.spinner.show();
    this.activityService.getFiles().snapshotChanges().pipe(
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

  deleteFileUpload(fileUpload: Activity): void {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        this.activityService.deleteFile(fileUpload);
        this.alertService.showSuccess('Deleted successfully.!');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled'
        )
      }
    })
  }

}
