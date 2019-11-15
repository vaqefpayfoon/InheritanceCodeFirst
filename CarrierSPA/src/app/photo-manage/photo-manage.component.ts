import { Component, OnInit, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/file-upload/file-uploader.class';
import { environment } from 'src/environments/environment';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-photo-manage',
  templateUrl: './photo-manage.component.html',
  styleUrls: ['./photo-manage.component.css']
})
export class PhotoManageComponent implements OnInit {

  @Input() userId: any;

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  photoUrl: string;

  constructor(private userService: UserService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.initializeUploader();
    this.uploader.onBeforeUploadItem = (fileItem: any) => {
      fileItem.formData.push( { userId: this.userId } );
     };
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'auth/setphoto',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
      additionalParameter: {
        userId: '731a157a-31b0-41a0-b3e0-b28e1fe26ea7'
      }
    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res = JSON.parse(response);
        this.photoUrl = res.photoUrl;
        this.userId = res.userId;
      }
    };
  }
}
