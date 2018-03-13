import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {
  IonicPage, LoadingController, NavController,
  NavParams, ToastController, Platform, ActionSheetController,
} from 'ionic-angular';
import {HttpErrorResponse} from '@angular/common/http';
import {ProfilePage} from '../profile/profile';
import {MediaProvider} from '../../providers/media/media';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {EditorProvider} from '../../providers/editor/editor';
import {Tags} from '../../interfaces/tags';
import {Transfer, TransferObject} from '@ionic-native/transfer';
import {File} from '@ionic-native/file';
import {FilePath} from '@ionic-native/file-path';

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-uploadprofilepic',
  templateUrl: 'uploadprofilepic.html',
})
export class UploadprofilepicPage {

  @ViewChild('myCanvas') canvasRef: ElementRef;
  imageData: string;
  url: string;
  image = this.renderer.createElement('img');
  canvas: any;
  picData: any;
  userName: string;
  oldProfPic: any;

  tag: Tags = {
    file_id: null,
    tag: this.userName,
  };

  loading = this.loadingCtrl.create({
    content: 'Uploading, please wait...',
  });

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private mediaProvider: MediaProvider, private camera: Camera,
    private loadingCtrl: LoadingController, private renderer: Renderer2,
    public editorProvider: EditorProvider, private transfer: Transfer,
    private file: File, private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController, public platform: Platform,) {
    this.userName = this.navParams.get('username');
  }

  public presenActionSheer() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.loadFromLibrary(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.captureImage();
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    actionSheet.present();
  }

  public loadFromLibrary(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      this.filePath.resolveNativePath(imagePath).then(filePath => {
        this.editorProvider.setElements(this.canvas, this.image);
        this.imageData = imagePath;
        this.editorProvider.setFile(this.imageData);
      });
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top',
    });
    toast.present();
  }

  captureImage() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
    };
    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData);
      this.editorProvider.setElements(this.canvas, this.image);
      this.imageData = imageData;
      this.editorProvider.setFile(this.imageData);

    }, (err) => {
      // Handle error
      console.error(err);
    });
  }

  upload() {
    this.loading.present();
    // convert canvas to blob and upload
    this.canvas.toBlob(blob => {
      // create FormData-object
      const formData = new FormData();
      formData.append('file', blob);
      // add title and description to FormData object
      formData.append('title', 'profilepic');
      formData.append('description', 'profilepic');
      // send FormData object to API
      this.mediaProvider.getUploadData(formData).
        subscribe(response => {
          console.log(response);
          this.picData = response;
          this.tag.file_id = this.picData.file_id;
          this.mediaProvider.getFileWithSpecificTag(this.userName).
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
            setTimeout(() => {
              this.loading.dismiss();
              this.navCtrl.setRoot(ProfilePage);
            }, 2000);
          }, (error: HttpErrorResponse) => {
            console.log(error);
            this.loading.dismiss();
          });
        });
    }, 'image/jpeg', 0.5);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadprofilepicPage');
    this.canvas = this.canvasRef.nativeElement;
    this.tag.tag = this.userName;
  }

}
