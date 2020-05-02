import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  AfterContentInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Media } from '../model/media';
import { ApiService } from '../api.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { LocalstorageService } from '../localstorage.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit, AfterViewInit {
  public media: Media;
  public star = faStar;
  public selectedImage = 1;
  public is_logged_in = false;

  public loaded = false;

  public is_hardware = false;
  public is_software = false;
  public is_game = false;
  public is_dlc = false;
  public is_video = false;

  public stars: number[];



  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    public storage: LocalstorageService,
    private api: ApiService
  ) {
    storage.syncStorage();

    if (auth.isAuthenticated()) {
      this.is_logged_in = true;
    }

    this.stars = [0, 0, 0, 0, 0];


  }

  ngOnInit() {}

  ngAfterViewInit() {


    this.route.params.subscribe((params) => {
      const id = params.id;

      // asynchronously executing.
      this.api.getMediaByID(id).subscribe((media) => {
        this.media = media;
        this.loaded = true;

        switch (this.media.Type) {
          case 'Game': {
            this.is_game = true;
            break;
          }
          case 'Video': {
            this.is_game = true;
            break;
          }
          case 'Hardware': {
            this.is_hardware = true;
            break;
          }
          case 'DLC': {
            this.is_dlc = true;
            break;
          }
          case 'Software': {
            this.is_software = true;
            break;
          }
        }

        this.media.User_Rating = 3;
        for(let i = 0; i < this.media.User_Rating; i++){
          this.stars[i] = 1;
        }

      });
    });


  }

  hoverEvent(event) {
    console.log(event);
  }

  addToCart(media) {
    this.storage.addItemToCart(media);
  }

  changeImage(selectedImage) {
    this.selectedImage = selectedImage;
  }
}
