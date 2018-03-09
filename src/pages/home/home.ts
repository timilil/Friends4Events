import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {EventPage} from '../event/event';
import {HttpErrorResponse} from '@angular/common/http';
import {Media} from '../../interfaces/media';
import {Search} from '../../interfaces/search';
import {LoginPage} from '../login/login';
import {Searchtag} from '../../interfaces/searchtag';
import {SearchedeventsPage} from '../searchedevents/searchedevents';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['/pages/home/home.scss']
})
export class HomePage {

  latestImgsArray: any;
  searchedImgsArray: any;
  searchedImgsTags: any = [];
  oneMoreArray = [1, 2];
  file: any;

  media: Media = {
    title: '',
    description: ''
  };

  search: Search = {
    title: ''
  };

  searchTag: Searchtag = {
    tag: ''
  };

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  constructor(public navCtrl: NavController, private mediaProvider: MediaProvider) {

  }

  searchEvent() {
    this.mediaProvider.searchMedia(this.search).subscribe(response => {
      //console.log(response);
      this.searchedImgsArray = response;

      this.searchedImgsArray.map(search => {
        const fileId = search.file_id;
        //console.log(fileId);
// 1. kaikki yläpuolella tapahtuu, mut sit hyppää tonne alas kohtaan 2.
// 3. miten saan tästä alas päin, kohtaan 4.
        this.mediaProvider.tagsByFileId(fileId).subscribe(response => {
          //console.log(response);
          search.file = response;

          search.file.map(file => {
            const files = file;
            //console.log(files);
            if (files.tag == 'event'){
              this.searchedImgsTags.push(files);
            }
          });
        });
      });
// 4. nämä tapahtumaan ennen kuin 2. tapahtuu
// 2. eli hyppää tänne
      //console.log(this.searchedImgsId);
      this.setArray(this.searchedImgsTags);

      //console.log(this.searchedImgsArray);
    });
  }

  setArray(searchedArray){
    console.log(searchedArray);
    this.navCtrl.push(SearchedeventsPage, {
      search: searchedArray,
    });
  }

  searchEventByTag(tag){
    this.mediaProvider.searchTag("event").subscribe(response => {
      //console.log(response);
      this.navCtrl.push(SearchedeventsPage, {
        response: response,
        searchTag: this.searchTag.tag
      })
    });
  }

  ionViewDidLoad(){
    this.mediaProvider.get5LatestImages().subscribe(response => {
      console.log(response);
      this.latestImgsArray = response;
      console.log(this.mediaProvider.logged);
    });
    if(localStorage.getItem('token') != null){
      this.mediaProvider.logged = true;
    }
  }

  itemTapped(event, file_id, title, description, user_id, filename, time_added) {
    if (localStorage.getItem('token') != null) {
      this.navCtrl.push(EventPage, {
        file_id: file_id,
        title: title,
        description: description,
        user_id: user_id,
        filename: filename,
        time_added: time_added
      });
    } else {
      this.navCtrl.setRoot(LoginPage);
    }
  }
}
