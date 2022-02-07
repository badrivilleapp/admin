import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from '../_components/common/home/home.component';
import { AddActivityComponent } from '../_components/activity/add-activity/add-activity.component';
import { ViewActivityComponent } from '../_components/activity/view-activity/view-activity.component';
import { HomestayComponent } from '../_components/card-details/homestay/homestay.component';
import { ResortsComponent } from '../_components/card-details/resorts/resorts.component';
import { SpecialProductComponent } from '../_components/products/special-product/special-product.component';
import { AddProductComponent } from '../_components/products/add-product/add-product.component';
import { ViewProductComponent } from '../_components/products/view-product/view-product.component';
import { AddSliderComponent } from '../_components/slider/add-slider/add-slider.component';
import { ViewSliderComponent } from '../_components/slider/view-slider/view-slider.component';
import { AddReviewComponent } from '../_components/review/add-review/add-review.component';
import { ViewReviewComponent } from '../_components/review/view-review/view-review.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {
                path: 'add-slider',
                component: AddSliderComponent,

            },
            {
                path: 'view-slider',
                component: ViewSliderComponent,

            },
            {
                path: 'add-activity',
                component: AddActivityComponent,

            },
            {
                path: 'view-activity',
                component: ViewActivityComponent,

            },
            {
                path: 'home-stay',
                component: HomestayComponent,

            },
            {
                path: 'resorts',
                component: ResortsComponent,

            },
            {
                path: 'add-product',
                component: AddProductComponent,

            },
            {
                path: 'add-special-product',
                component: SpecialProductComponent,

            },
            {
                path: 'view-product',
                component: ViewProductComponent,

            },
            {
                path: 'add-review',
                component: AddReviewComponent,

            },
            {
                path: 'view-review',
                component: ViewReviewComponent,

            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }