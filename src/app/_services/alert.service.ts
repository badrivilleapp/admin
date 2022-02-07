import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({ providedIn: 'root' })

export class AlertService {

    constructor(
        private toastrService: ToastrService
    ) {}

    public showSuccess(msg): any {
        return this.toastrService.success(msg, '', {
            tapToDismiss:true
        });
    }

    public showError(msg): any {
        return this.toastrService.error(msg, '', {
            tapToDismiss:true
        });
    }

    public get validateFieldError(): any {
        return this.toastrService.error('Please fill required field', 'Alert.!', {
            tapToDismiss:true
        });
    }
}