import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';

/**
 * Generated class for the SearchedeventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searchedevents',
  templateUrl: 'searchedevents.html',
})
export class SearchedeventsPage {

  response: any;
  description: string;
  file_id: number;
  filename: string;
  tag: string;
  tag_id: number;
  title: string;
  user_id: string;
  time_added: string;
  searchTag: string;
  searchedImgsArray: any;
  anotherArray: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaProvider: MediaProvider) {
    this.searchedImgsArray = this.navParams.get('search')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchedeventsPage');
    console.log(this.searchedImgsArray);
    this.searchedImgsArray.forEach(search => {
      console.log(search);
      const searched = search;
      console.log(searched.tag);
    });

  }

  loopArray(){
    for (let i; i < this.searchedImgsArray; i++){
      console.log(this.searchedImgsArray[i]);
    }
  }
}
