import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, Subject } from 'rxjs';
import { WebcamImage } from '../webcam/domain/webcam-image';
import { WebcamUtil } from '../webcam/util/webcam.util';
import { WebcamInitError } from '../webcam/domain/webcam-init-error';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-new-business-card',
  templateUrl: './new-business-card.component.html',
  styleUrls: ['./new-business-card.component.css']
})
export class NewBusinessCardComponent implements OnInit {
  // ---- webcam ---- 
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public facingMode: string = 'environment';
  public errors: WebcamInitError[] = [];
  // latest snapshot
  public webcamImage: WebcamImage = null;
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  // ---- firebase ----
  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore, private http: HttpClient) { }

  ngOnInit() {
    // firebase data
    this.itemsCollection = this.afs.collection('test');

    // webcam init
    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
  }

  public sendToGoogle()
  {
    const googleVisionURL: string = `https://vision.googleapis.com/v1/images:annotate?key=${environment.googleCloud}`; 
    const base64Image: string = this.webcamImage.imageAsBase64;

    const request: any = {
      "requests" : [
        {
          "image" : {
            "content" : base64Image
          },
          "features" : [
            { 
              "type" : "TEXT_DETECTION"
            }
          ]
        }
      ]
    };

    console.log(request);

    this.http.post(googleVisionURL, request).subscribe( (results: any) => {
      console.log("IN FROM GOOGLE");
      console.log(results);
    });
  }

  // takes whole form so it can reset it
  pushData(form: any): void {
    this.itemsCollection.add({
      f_name: form.value.f_name,
      l_name: form.value.l_name,
      email: form.value.email
    });

    form.reset(); // clear fields
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
      console.warn("Camera access was not allowed by user!");
    }
    this.errors.push(error);
  }

  // dont need this
  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.log('received webcam image', webcamImage);
    this.webcamImage = webcamImage;

    //console.log("SENDING TO GOOGLE...");
    //this.sendToGoogle();
  }

  public discardImage(): void {
    this.webcamImage = null;
  }

  // dont need this
  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  // dont need this
  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  // dont need this
  public get videoOptions(): MediaTrackConstraints {
    const result: MediaTrackConstraints = {};
    if (this.facingMode && this.facingMode !== "") {
      result.facingMode = { ideal: this.facingMode };
    }

    return result;
  }

}
