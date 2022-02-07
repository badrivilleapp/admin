export class OtherProduct {
  key!: string;
  name!: string;
  title!: string;
  price!: string;
  url!: string;
  file: File;

  constructor(title: string, price: string, file: File) {
    this.title = title;
    this.price = price;
    this.file = file;
  }
}