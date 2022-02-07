export class HomeSlider {
  key!: string;
  name!: string;
  title!: string;
  description!: string;
  url!: string;
  file: File;

  constructor(title: string, description: string, file: File) {
    this.title = title;
    this.description = description;
    this.file = file;
  }
}