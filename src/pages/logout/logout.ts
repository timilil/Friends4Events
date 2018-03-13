import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {HomePage} from '../home/home';

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
    this.mediaProvider.logout();
    this.mediaProvider.logged = false;
    this.navCtrl.setRoot(HomePage);
  }

}
