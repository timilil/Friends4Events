import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {EXIF} from 'exif-js';
import {File, FileEntry} from '@ionic-native/file';

/*
  Generated class for the EditorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EditorProvider {

  canvas: any;
  context: any;
  image: any;
  imageData: any;
  pixels: any;
  numPixels: number;

  constructor(public http: HttpClient, private file: File) {
    console.log('Hello EditorProvider Provider');
  }

  setElements(c, i) {
    this.canvas = c;
    this.context = this.canvas.getContext('2d');
    this.image = i;
  };

  setFile(imData): void {
    this.file.resolveLocalFilesystemUrl(imData).
      then(entry => (<FileEntry>entry).file(file => this.filetoCanvas(file))).
      catch(err => console.log(err));
  }

  filetoCanvas(file) {
    const reader: FileReader = new FileReader();

    reader.onload = () => {
      // console.log(reader.result);
      this.image.src = reader.result;
      this.image.onload = () => this.resetImage();
    };
    reader.readAsDataURL(file);
  };

  resetImage() {
    this.canvas.height = this.image.height;
    this.canvas.width = this.image.width;

    this.context.drawImage(this.image, 0, 0, this.image.width,
      this.image.height);
    this.imageData = this.context.getImageData(0, 0, this.canvas.width,
      this.canvas.height);
    this.pixels = this.imageData.data;
    this.numPixels = this.imageData.width * this.imageData.height;
  };

}
