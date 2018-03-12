import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';

/**
 * Generated class for the ViewprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewprofile',
  templateUrl: 'viewprofile.html',
})
export class ViewprofilePage {

  userId: number;
  userName: string;
  userEmail: string;
  fullName: string;
  profilePic: any;
  profilePicName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaProvider: MediaProvider) {
    this.userName = this.navParams.get('username');
    this.userEmail = this.navParams.get('email');
    this.userId = this.navParams.get('user_id');
    this.fullName = this.navParams.get('fullname');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewprofilePage');
    console.log(this.userEmail);
    console.log(this.userName);
    console.log(this.userId);
    console.log(this.fullName);
    this.getProfilePic();
  }

  getProfilePic() {
    this.mediaProvider.getFileWithSpecificTag(this.userName).
      subscribe(response => {
        console.log(response);
        this.profilePic = response;
        if (this.profilePic.length != 0) {
          console.log(this.profilePic);
          console.log(this.profilePic[0].file_id);
          console.log(this.profilePic[0].filename);
          this.profilePicName = this.profilePic[0].filename;
          console.log(this.profilePicName);
        }
      });
  }

}
