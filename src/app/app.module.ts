import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './_modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './_modules/core.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HomeComponent } from './_components/common/home/home.component';
import { AdminLoginComponent } from './_components/auth/admin-login/admin-login.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { AddActivityComponent } from './_components/activity/add-activity/add-activity.component';
import { ViewActivityComponent } from './_components/activity/view-activity/view-activity.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HomestayComponent } from './_components/card-details/homestay/homestay.component';
import { ResortsComponent } from './_components/card-details/resorts/resorts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpecialProductComponent } from './_components/products/special-product/special-product.component';
import { AddProductComponent } from './_components/products/add-product/add-product.component';
import { ViewProductComponent } from './_components/products/view-product/view-product.component';
import { FooterComponent } from './_components/common/footer/footer.component';
import { SearchTitlePipe } from './_pipe/search-title.pipe';
import { ViewSliderComponent } from './_components/slider/view-slider/view-slider.component';
import { AddSliderComponent } from './_components/slider/add-slider/add-slider.component';
import { SidenavComponent } from './_components/common/sidenav/sidenav.component';
import { AddReviewComponent } from './_components/review/add-review/add-review.component';
import { ViewReviewComponent } from './_components/review/view-review/view-review.component';
import { WysiwygMenuComponent } from './_components/common/wysiwyg-menu/wysiwyg-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminLoginComponent,
    AddActivityComponent,
    ViewActivityComponent,
    HomestayComponent,
    ResortsComponent,
    SpecialProductComponent,
    AddProductComponent,
    ViewProductComponent,
    FooterComponent,
    SearchTitlePipe,
    AddSliderComponent,
    ViewSliderComponent,
    SidenavComponent,
    AddReviewComponent,
    ViewReviewComponent,
    WysiwygMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    NgxSpinnerModule,
    FlexLayoutModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), // ToastrModule added
    AngularEditorModule,
    NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
