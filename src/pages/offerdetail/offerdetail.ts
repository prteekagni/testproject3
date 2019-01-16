import { Component, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, AlertController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OffersProvider } from '../../providers/offers/offers';
import { SharedProvider } from '../../providers/shared/shared';
import { ErrormodalComponent } from '../../components/errormodal/errormodal';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

/**
 * Generated class for the OfferdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
  })
};

@IonicPage()
@Component({
  selector: "page-offerdetail",
  templateUrl: "offerdetail.html"
})
export class OfferdetailPage implements AfterViewInit {

  public offerDetail;
  public id: any;
  public  browser;
  testRadioOpen: boolean;
  testRadioResult;
  public errorModel;


  public options: InAppBrowserOptions = {
    location: 'yes',//Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'no',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only 
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only 
    toolbar: 'yes', //iOS only 
    enableViewportScale: 'no', //iOS only 
    allowInlineMediaPlayback: 'no',//iOS only 
    presentationstyle: 'pagesheet',//iOS only 
    fullscreen: 'yes',//Windows only    
  };
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private clipboard: Clipboard,
    private platform: Platform,
    private offerService: OffersProvider,
    private sharedService: SharedProvider,
    public modalCtrl: ModalController,
    private alertController: AlertController,
    private iab: InAppBrowser,
    
  ) {
    // this.platform.registerBackButtonAction(() => {
    //   console.log(this.navCtrl
    //                    .canGoBack());
    //   // if there is child page, we pop that page
    //   if (this.navCtrl
    //            .canGoBack()) {
    //     this.navCtrl.pop();
    //   }
    // },101
    // )
  
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  ionViewDidLoad() {
    this.id = this.navParams.get("ID");

    // this.offerService.getOfferById(this.id).subscribe(res => {
    //   this.offerDetail = res;
    // }, err => {
    //   this.sharedService.createToast('Unable to load offer details');
    // })
    console.log("ionViewDidLoad OfferdetailPage");
  }

  ionViewDidEnter() {
    var coupon = "coupon";

    // this.clipboard.copy(coupon).then(res => {
    // })

    // let alert = this.alertController.create({
    //   title: 'Coupon Copied',
    //   message: 'Visit the Site',
    //   buttons: [
    //     {
    //       text: 'Visit',
    //       handler: () => {
    //         console.log('Buy clicked');
    //       }
    //     }
    //   ]
    // });
    let alert = this.alertController.create({
      title: "Coupon Copied",
      subTitle: "Visit the website for the deal",
      buttons: [
        {
          text: "Visit",
          handler: () => {
            this.browser = this.iab.create('http://google.com', '_self', this.options);
            this.browser.on('loadstop').subscribe(event => {
              console.log('loadstop');
            });
          }
        }
      ]
    });
    alert.present();

    setTimeout(() => {
      alert.dismiss();
    }, 4000);
  }

  ngAfterViewInit() {}

  insertView() {
    this.navCtrl.push("Dea");
  }
  
  visitSite() {
    const browser = this.iab.create('https://ionicframework.com/', '_blank', this.options);
      console.log(browser);
  }

  reportProblem() {
    let alert = this.alertController.create();
    alert.setTitle("Report Problem");

    alert.addInput({
      type: "radio",
      label: "Link not working",
      value: "0",
      checked: true
    });
    alert.addInput({
      type: "radio",
      label: "Coupon not working",
      value: "1",
      checked: false
    });
    alert.addInput({
      type: "radio",
      label: "Offer Expired",
      value: "2",
      checked: false
    });
    alert.addButton("Cancel");
    alert.addButton({
      text: "OK",
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
        this.errorModel = {
          'ID':this.id,
          'Data': data
        }
        console.log(this.errorModel);
      this.sharedService.sendErrorReports(this.errorModel).subscribe(res=>{
        console.log(res);
      })
      }
    });
    alert.present();

    setTimeout(() => {
      alert.dismiss();
    }, 3000);
  }
}
