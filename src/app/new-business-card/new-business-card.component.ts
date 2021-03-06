import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { WebcamImage } from '../webcam/domain/webcam-image';
import { WebcamUtil } from '../webcam/util/webcam.util';
import { WebcamInitError } from '../webcam/domain/webcam-init-error';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { IBusinessCard, IBusinessCardID } from '../business-card/model/business-card.model';
import { BusinessCardService } from '../business-card/service/business-cards.service';

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

  // ---- data model ----
  private formData: IBusinessCard;

  constructor(private afs: AngularFirestore, private http: HttpClient, private router: Router, private cards : BusinessCardService) {
    this.formData = {
      f_name : '',
      l_name: '',
      email: '',
      phone_number : '',
      misc_text: '', 
      image: ''
    }
   }

  ngOnInit() {

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

    // should be getting destroyed when it leaves scope...
    this.http.post(googleVisionURL, request).subscribe( (results: any) => {

      const resultText = results.responses[0].textAnnotations.map(e => { return e.description; });
      resultText.shift();

      this.processResults(resultText);

    });

  }

  processResults(tokens: string[]) : void {
    // assumes name is first two elements
    this.formData.f_name = tokens.shift();
    this.formData.l_name = tokens.shift();

    const areaCodeRegex = /.[0-9]./;
    const phoneRegex = /[0-9]{3}\-[0-9]{4}/;
    const emailRegex = /.+\@.+(.com|.org|.gov|.biz)/;

    tokens.forEach( (element) => {

      if (areaCodeRegex.exec(element) != null || phoneRegex.exec(element) != null) {
        this.formData.phone_number += element + ' ';
      }

      else if (emailRegex.exec(element) != null) {
        this.formData.email += element;
      } 

      else {
        this.formData.misc_text += element + ' ';
      }

    });
  }

  pushData(form: any): void {

    // set up data obj
    const cardToPush: IBusinessCard = {
      f_name: form.value.f_name.trim(),
      l_name: form.value.l_name.trim(),
      email: form.value.email.trim(),
      phone_number: form.value.phone_number.trim(),
      misc_text: form.value.misc_text.trim(),
      image: this.webcamImage.imageAsDataUrl
    }

    // push to db
    this.cards.create(cardToPush).then( () => {
      this.router.navigate(['dashboard/search']);
    }).catch( (error) => {
      console.log(error);
    });

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

    this.sendToGoogle();
  }

  public discardImage(): void {
    this.webcamImage = null;
    this.clearFormModel();
  }

  private clearFormModel() : void {
    this.formData.f_name = '';
    this.formData.l_name = '';
    this.formData.email = '';
    this.formData.phone_number = '';
    this.formData.misc_text= '';
    this.formData. image = '';
  }

  // dont need this
  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  // // dont need this
  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  // // dont need this
  public get videoOptions(): MediaTrackConstraints {
    const result: MediaTrackConstraints = {};
    if (this.facingMode && this.facingMode !== "") {
      result.facingMode = { ideal: this.facingMode };
    }

    return result;
  }

}
