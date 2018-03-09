import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {HttpErrorResponse} from '@angular/common/http';
import {LoginPage} from '../login/login';
import {Media} from '../../interfaces/media';
import {ListPage} from '../list/list';
import {Tags} from '../../interfaces/tags';
import {EventPage} from '../event/event';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  file: File;
  picData: any;
  userData: any;
  userName: string;
  userEmail: string;
  currentUserId: number;
  fullName: string;
  oldProfPic: any;
  profilePic: any;
  profilePicName: any;
  eventsArray: any;
  userEvents: any = [];
  mySignedEventsArray: any = [];
  mySigned: any = [];

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
    //this.userName = navParams.get('username');
    //this.userEmail = navParams.get('email');
    //this.fullName = navParams.get('full_name');
  }

  getUserInformation() {
    this.getProfilePic();

    this.mediaProvider.getUserData().subscribe(response => {
      //console.log(response);
      this.userName = response['username'];
      this.userEmail = response['email'];
      this.fullName = response['full_name'];
      this.currentUserId = response['user_id'];
      //console.log(response);
      this.mediaProvider.getFileWithSpecificTag('event').subscribe(response => {
        this.eventsArray = response;
        console.log(this.eventsArray);
        for (let i = 0; i<this.eventsArray.length; i++){
          if (this.currentUserId == this.eventsArray[i]['user_id']){
            console.log(this.eventsArray[i]);
            this.userEvents.push(this.eventsArray[i]);
          }
        }
      });
    });
    this.mediaProvider.getAllLikes().subscribe(response => {
      console.log(response);
      this.mySignedEventsArray = response;
      this.mySignedEventsArray.forEach(id => {
        console.log(id.file_id);
        this.mediaProvider.getFileByFileId(id.file_id).subscribe(response =>{
          //console.log(response);
          this.mySigned.push(response);
        });
      })
    })
    console.log(this.mySigned);
  }

  setFile(evt) {
    console.log(evt.target.files[0]);
    this.file = evt.target.files[0];
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

  uploadProfilePic() {
    console.log(this.media);
    const formData = new FormData();
    formData.append('title', 'profilepic');
    formData.append('description', 'profilepic');
    formData.append('file', this.file);

    this.mediaProvider.getUploadData(formData).subscribe(response => {
      this.picData = response;
      this.tag.file_id = this.picData.file_id;
      console.log(this.tag.file_id);
      this.mediaProvider.getUserData().subscribe(response => {
        this.userData = response;
        this.tag.tag = this.userData.username;
        console.log(this.tag.tag);
        this.mediaProvider.getFileWithSpecificTag(this.tag.tag).
          subscribe(response => {
            this.oldProfPic = response;
            console.log(response);
            console.log(this.oldProfPic);
            if (this.oldProfPic.length != 0) {
              console.log(this.oldProfPic[0].file_id);
              this.mediaProvider.deleteFile(this.oldProfPic[0].file_id).
                subscribe(response => {
                  console.log(this.oldProfPic.file_id);
                  console.log(response);
                });
            }
          });
        this.mediaProvider.postTag(this.tag).subscribe(response => {
          console.log(response);
        });
      });
      this.navCtrl.setRoot(ProfilePage);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  /*
    postNewTag() {
      this.mediaProvider.postTag(this.tag).subscribe(response => {
        console.log(response);
      });
    }
  */

  changeProfilePicture(evt) {
    console.log('efwrehtrjyku');
    this.setFile(evt);
    this.uploadProfilePic();
    this.navCtrl.push(ProfilePage);
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
        });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    if (localStorage.getItem('token') == null) {
      //this.router.navigate(['front']);
      this.navCtrl.setRoot(LoginPage);
    }
    else {
      this.getUserInformation();
    }
  }

  itemTapped(event, item, file_id, title, description, user_id, filename, time_added) {
    // push the params to EventPage
    this.navCtrl.push(EventPage, {
      item: item,
      file_id: file_id,
      title: title,
      description: description,
      user_id: user_id,
      filename: filename,
      time_added: time_added
    });
  }

}
