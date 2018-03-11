import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpErrorResponse} from '@angular/common/http';
import {MediaProvider} from '../../providers/media/media';
import {UpdateUser} from '../../interfaces/updateUser';
import {HomePage} from '../home/home';

@IonicPage()
@Component({
  selector: 'page-update',
  templateUrl: 'update.html',
})
export class UpdatePage {

  updateUser: UpdateUser = {
    username: '',
    password: '',
    email: '',
    token: localStorage.getItem('token')
  };

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private mediaProvider: MediaProvider) {
  }

  updateData(){
    this.mediaProvider.updateUserData(this.updateUser).subscribe(response => {
      console.log(response);
      this.mediaProvider.username = this.updateUser.username;
      this.mediaProvider.password = this.updateUser.password;
      this.mediaProvider.email = this.updateUser.email;
      this.navCtrl.setRoot(HomePage);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePage');
  }
}
