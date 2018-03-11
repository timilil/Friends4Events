import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Media} from '../../interfaces/media';
import {MediaProvider} from '../../providers/media/media';
import {Tags} from '../../interfaces/tags';
import {ListPage} from '../list/list';
import {HttpErrorResponse} from '@angular/common/http';

/**
 * Generated class for the AddeventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaProvider: MediaProvider) {
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
      console.log(response);
      this.picData = response;
      this.tag.file_id = this.picData.file_id;
      this.tag.tag = 'event';
      this.navCtrl.setRoot(ListPage);
      this.mediaProvider.postTag(this.tag).subscribe(response => {
        console.log(response);
      });
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  setFile(evt) {
    console.log(evt.target.files[0]);
    this.file = evt.target.files[0];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddeventPage');
  }

}
