import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Media} from '../../interfaces/media';
import {MediaProvider} from '../../providers/media/media';
import {Tags} from '../../interfaces/tags';
import {HttpErrorResponse} from '@angular/common/http';
import {ProfilePage} from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-addevent',
  templateUrl: 'addevent.html',
})
export class AddeventPage {

  picData: any;
  file: File;

  media: Media = {
    title: '',
    description: '',
  };

  tag: Tags = {
    file_id: null,
    tag: '',
  };

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private mediaProvider: MediaProvider) {
  }

  startUpload() {
    console.log(this.media);
    // create FormData-object
    const formData = new FormData();
    // add title and description to FormData-object
    formData.append('title', this.media.title);
    formData.append('description', this.media.description);
    // add file to FormData-object
    formData.append('file', this.file);
    // send FormData object to API
    this.mediaProvider.getUploadData(formData).subscribe(response => {
      this.picData = response;
      this.tag.file_id = this.picData.file_id;
      this.tag.tag = 'event';
      this.navCtrl.setRoot(ProfilePage);
      this.mediaProvider.postTag(this.tag).subscribe(response => {
        console.log(response);
      });
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  setFile(evt) {
    this.file = evt.target.files[0];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddeventPage');
  }

}
