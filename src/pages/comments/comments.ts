import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {Comment} from '../../interfaces/comment';
import {ViewprofilePage} from '../viewprofile/viewprofile';

/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  fileID: number;
  commentsArray: any;
  userName: any;
  userID: number;
  allComments: any = [];
  profilePic: any;
  profilePicName: string;

  comment: Comment = {
    file_id: null,
    comment: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaProvider: MediaProvider) {
    this.fileID = this.navParams.get('file_id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
    this.comment.file_id = this.fileID;
    console.log(this.fileID);
    this.getCommentsByFileId();
    this.getProfilePicByUserName();
  }

  getCommentsByFileId () {
    let allcomments: any;
    this.mediaProvider.getCommentsByFileId(this.fileID).subscribe(response => {
      //console.log(response);
      this.commentsArray = response;
      this.commentsArray.map(comment => {
        const userID = comment.user_id;
        //console.log(userID);
        //this.allUserIds.push(userID);
        this.mediaProvider.getUsernameByUserId(userID).subscribe(response => {
          //console.log(response);
          comment.user = response;
          //console.log(comment.user.username);
            this.mediaProvider.getFileWithSpecificTag(comment.user.username).
              subscribe(response => {
                console.log(response);
                comment.user.tag = response[0];
              });
        });
      }
      /*,
        error => {
          console.log(error);
        },
        () => {
          console.log(this.commentsArray[0].user);
        }*/);
      console.log(this.commentsArray);
    });
  }

  getProfilePicByUserName (){
    console.log(this.allComments);
    this.allComments.map(profile => {
      console.log(profile);
      this.mediaProvider.getFileWithSpecificTag(profile).
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

  postNewComment(){
    this.mediaProvider.commentEvent(this.comment).subscribe(response => {
      console.log(response);
      this.navCtrl.pop();

      this.navCtrl.push(CommentsPage, {

        file_id: this.fileID
      });
    });
  }

  redirectToUserThatPosted(event, userName, email, userid, fullname) {
    this.navCtrl.push(ViewprofilePage, {
      username: userName,
      user_id: userid,
      email: email,
      fullname: fullname
    });
  }

}
