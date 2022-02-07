export class Activity {
  key!: string;
  title!: string;
  banner_name!: string;
  location!: string;
  banner_color!: string;
  path!: string;
  activity_name!: string;
  activity_icon_name!: string;
  image!: File;
  icon: File;

  constructor(title: string, banner_name: string, location: string, banner_color: string, path: string, image: File, icon: File) {
    this.title = title;
    this.banner_name = banner_name;
    this.location = location;
    this.banner_color = banner_color;
    this.path = path;
    this.image = image;
    this.icon = icon;
  }
}