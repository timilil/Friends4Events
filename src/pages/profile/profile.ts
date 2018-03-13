import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {
  AlertController,
  IonicPage, LoadingController, NavController, NavParams,
} from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {HttpErrorResponse} from '@angular/common/http';
import {LoginPage} from '../login/login';
import {Media} from '../../interfaces/media';
import {Tags} from '../../interfaces/tags';
import {EventPage} from '../event/event';
import {AddeventPage} from '../addevent/addevent';
import {UploadprofilepicPage} from '../uploadprofilepic/uploadprofilepic';
import {UpdatePage} from '../update/update';

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

  @ViewChild('myCanvas') canvasRef: ElementRef;
  debug: string;
  imageData: string;
  url: string;
  image = this.renderer.createElement('img');
  canvas: any;

  loading = this.loadingCtrl.create({
    content: 'Uploading, please wait...',
  });

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
    private mediaProvider: MediaProvider,
    private renderer: Renderer2,
    private loadingCtrl: LoadingController, public alertCtrl: AlertController) {
  }

  getUserInformation() {
    this.getProfilePic();

    this.mediaProvider.getUserData().subscribe(response => {
      this.userName = response['username'];
      this.userEmail = response['email'];
      this.fullName = response['full_name'];
      this.currentUserId = response['user_id'];
      this.mediaProvider.getFileWithSpecificTag('event').subscribe(response => {
        this.eventsArray = response;
        for (let i = 0; i < this.eventsArray.length; i++) {
          if (this.currentUserId == this.eventsArray[i]['user_id']) {
            this.userEvents.push(this.eventsArray[i]);
          }
        }
      });
    });
    this.mediaProvider.getAllLikes().subscribe(response => {
      this.mySignedEventsArray = response;
      this.mySignedEventsArray.forEach(id => {
        this.mediaProvider.getFileByFileId(id.file_id).subscribe(response => {
          //console.log(response);
          this.mySigned.push(response);
        });
      });
    });
  }

  setFile(evt) {
    this.file = evt.target.files[0];
  }

  uploadProfilePic() {
    //console.log(this.media);
    const formData = new FormData();
    formData.append('title', 'profilepic');
    formData.append('description', 'profilepic');
    formData.append('file', this.file);

    this.mediaProvider.getUploadData(formData).subscribe(response => {
      this.picData = response;
      this.tag.file_id = this.picData.file_id;
      this.mediaProvider.getUserData().subscribe(response => {
        this.userData = response;
        this.tag.tag = this.userData.username;
        this.mediaProvider.getFileWithSpecificTag(this.tag.tag).
          subscribe(response => {
            this.oldProfPic = response;
            if (this.oldProfPic.length != 0) {
              this.mediaProvider.deleteFile(this.oldProfPic[0].file_id).
                subscribe(response => {
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

  changeProfilePicture(evt) {
    this.setFile(evt);
    this.uploadProfilePic();
    this.navCtrl.push(ProfilePage);
  }

  getProfilePic() {
    this.mediaProvider.getUserData().subscribe(response => {
      this.userName = response['username'];
      this.mediaProvider.getFileWithSpecificTag(this.userName).
        subscribe(response => {
          this.profilePic = response;
          if (this.profilePic.length != 0) {
            this.profilePicName = this.profilePic[0].filename;
          }
        });
    });
  }

  deleteEvent(event, file_id) {
    let confirm = this.alertCtrl.create({
      title: 'Delete Event',
      message: 'Are you sure you want to delete this event?',
      buttons: [
        {
          text: 'No',
          handler: () => {
          },
        },
        {
          text: 'Yes',
          handler: () => {
            this.mediaProvider.deleteFile(file_id).subscribe(response => {
              //console.log(response);
              this.navCtrl.setRoot(ProfilePage);
            });
          },
        },
      ],
    });
    confirm.present();
  }

  redirectToAddEventPage() {
    this.navCtrl.push(AddeventPage);
  }

  redirectToProfilePicUploadPage() {
    this.navCtrl.push(UploadprofilepicPage, {
      username: this.userName,
    });
  }

  redirectToUpdatePage() {
    this.navCtrl.push(UpdatePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    if (localStorage.getItem('token') == null) {
      this.navCtrl.setRoot(LoginPage);
    }
    else {
      this.getUserInformation();
    }
  }

  itemTapped(
    event, item, file_id, title, description, user_id, filename, time_added) {
    this.navCtrl.push(EventPage, {
      item: item,
      file_id: file_id,
      title: title,
      description: description,
      user_id: user_id,
      filename: filename,
      time_added: time_added,
      loggeduserid: this.currentUserId,
    });
  }

}
