import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';

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

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private mediaProvider: MediaProvider) {
    this.userName = this.navParams.get('username');
    this.userEmail = this.navParams.get('email');
    this.userId = this.navParams.get('user_id');
    this.fullName = this.navParams.get('fullname');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewprofilePage');
    this.getProfilePic();
  }

  getProfilePic() {
    this.mediaProvider.getFileWithSpecificTag(this.userName).
      subscribe(response => {
        this.profilePic = response;
        if (this.profilePic.length != 0) {
          this.profilePicName = this.profilePic[0].filename;
        }
      });
  }

}
