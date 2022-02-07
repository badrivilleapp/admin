import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { map } from 'rxjs/operators';
import { AlertService } from 'src/app/_services/alert.service';
import { CardService } from 'src/app/_services/card.service';

@Component({
  selector: 'app-resorts',
  templateUrl: './resorts.component.html',
  styleUrls: ['./resorts.component.css']
})
export class ResortsComponent implements OnInit {

  htmlContent: any;
  isDisable = true;
  public pricingForm: any = FormGroup;
  public itemsArray: any = FormArray;

  productList: any = [];
  constructor(
    private homestayService: CardService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getSpecialProduct();
    this.pricingForm = this.formBuilder.group({
      items: this.formBuilder.array([this.initItemRows()])
    });
    // set contactlist to the form control containing contacts
    this.itemsArray = this.pricingForm.get('items') as FormArray;
  }
  get formArr(): FormArray {
    return this.pricingForm.get("items") as FormArray
  }

  async addSpecialProduct() {
    this.isDisable = true;

    let items = this.pricingForm.value.items;

    let final: any = [];

    //get all pricing description
    items.map(async (value: any) => {
      let record = {
        benefits: value.description,
      }
      await this.homestayService.saveResortsData({ ...record });
    })
    await this.getSpecialProduct();
    this.alertService.showSuccess('Saved successfully.!');
  }

  async getSpecialProduct(): Promise<void> {
    this.productList = [];
    this.homestayService.getResortsData().snapshotChanges().pipe(
      map(changes =>
        // store the key 
        changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      )
    ).subscribe(async res => {
      await this.productList.push(...res);
      console.log(this.productList);
    });
  }

  toggleSaveBtn() {
    this.isDisable = false;
  }

  priceDesc = new FormGroup({
    pdesc: new FormControl('')
  });

  pdesc = new FormControl();

  initItemRows() {
    return this.formBuilder.group({
      description: ['']
    });
  }

  addItem(): void {
    this.itemsArray.push(this.initItemRows());
  }

  removeItem(i: number) {
    this.formArr.removeAt(i);
  }

  async deleteBenefit(key) {
    await this.homestayService.deleteResortsData(key);
    this.alertService.showSuccess('Deleted successfully.!');
  }

}
