import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
    declarations: [
    ],
    imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        AdminRoutingModule,
        CommonModule
    ],
    exports: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {

}