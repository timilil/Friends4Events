import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {Comment} from '../../interfaces/comment';
import {ViewprofilePage} from '../viewprofile/viewprofile';

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  fileID: number;
  commentsArray: any;
  userName: any;
  allComments: any = [];
  profilePic: any;
  profilePicName: string;

  comment: Comment = {
    file_id: null,
    comment: '',
  };

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private mediaProvider: MediaProvider) {
    this.fileID = this.navParams.get('file_id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
    this.comment.file_id = this.fileID;
    //console.log(this.fileID);
    this.getCommentsByFileId();
    this.getProfilePicByUserName();
  }

  getCommentsByFileId() {
    let allcomments: any;
    this.mediaProvider.getCommentsByFileId(this.fileID).subscribe(response => {
      this.commentsArray = response;
      this.commentsArray.map(comment => {
        const userID = comment.user_id;
        this.mediaProvider.getUsernameByUserId(userID).subscribe(response => {
          comment.user = response;
          this.mediaProvider.getFileWithSpecificTag(comment.user.username).
            subscribe(response => {
              console.log(response);
              comment.user.tag = response[0];
            });
        });
      });
      console.log(this.commentsArray);
    });
  }

  getProfilePicByUserName() {
    //console.log(this.allComments);
    this.allComments.map(profile => {
      this.mediaProvider.getFileWithSpecificTag(profile).
        subscribe(response => {
          this.profilePic = response;
          if (this.profilePic.length != 0) {
            //console.log(this.profilePic[0].filename);
            this.profilePicName = this.profilePic[0].filename;
          }
        });
    });
  }

  postNewComment() {
    this.mediaProvider.commentEvent(this.comment).subscribe(response => {
      this.navCtrl.pop();
      this.navCtrl.push(CommentsPage, {
        file_id: this.fileID,
      });
    });
  }

  redirectToUserThatPosted(event, userName, email, userid, fullname) {
    this.navCtrl.push(ViewprofilePage, {
      username: userName,
      user_id: userid,
      email: email,
      fullname: fullname,
    });
  }

}
