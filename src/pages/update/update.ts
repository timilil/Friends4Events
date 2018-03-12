import {Component} from '@angular/core';
import {
  AlertController, IonicPage, NavController,
  NavParams, ToastController,
} from 'ionic-angular';
import {HttpErrorResponse} from '@angular/common/http';
import {MediaProvider} from '../../providers/media/media';
import {UpdateUser} from '../../interfaces/updateUser';
import {HomePage} from '../home/home';
import {Media} from '../../interfaces/media';
import {Tags} from '../../interfaces/tags';
import {ProfilePage} from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-update',
  templateUrl: 'update.html',
})
export class UpdatePage {

  updateUser: UpdateUser = {
    token: localStorage.getItem('token')
  };

  userData: any;
  oldProfPic: any;
  confirmPass: any;
  userName: string;
  profilePic: any;
  profilePicName: any;

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
    private mediaProvider: MediaProvider, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  updateData() {
    if (this.confirmPass == this.updateUser.password) {
    this.mediaProvider.updateUserData(this.updateUser).subscribe(response => {
      console.log(response);
      this.getProfilePic();
      this.mediaProvider.username = this.updateUser.username;
      this.mediaProvider.password = this.updateUser.password;
      this.mediaProvider.email = this.updateUser.email;
      if (this.profilePicName!=null) {
        this.tag.tag = this.updateUser.username;
        this.mediaProvider.postTag(this.tag).subscribe(response => {
          console.log(response);
        });
      }
      this.navCtrl.setRoot(ProfilePage);
      this.success();
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
    }
    else {
      this.showAlert();
    }
  }

  success() {
    let toast = this.toastCtrl.create({
      message: 'Updated successfully',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: "Passwords doesn't match!",
      buttons: ['OK'],
    });
    alert.present();
  }

  transferProfilePic() {
    this.mediaProvider.getUserData().subscribe( response => {
      this.userData = response;
      this.tag.tag = this.userData.username;
      this.mediaProvider.getFileWithSpecificTag(this.tag.tag).subscribe( response => {
        this.oldProfPic = response;
        this.tag.file_id = this.oldProfPic[0].file_id;
        console.log(this.tag);
      })
    })
  }

  getProfilePic() {
    this.mediaProvider.getUserData().subscribe(response => {
      this.userName = response['username'];
      console.log(this.userName);
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
          if (this.profilePicName != null) {
            this.transferProfilePic();
          }
        });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePage');
    this.getProfilePic();
  }
}
