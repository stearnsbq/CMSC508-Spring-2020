import { Component, OnInit } from '@angular/core';
import { Media } from '../model/media';
import { LocalstorageService } from '../localstorage.service';
import { faMinus, faStar } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from '../auth.service';
import { faSurprise } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  public allMedia: Media[];
  public minus: IconDefinition = faMinus;
  public star: IconDefinition = faStar;
  public has_items = false;
  public surprise: IconDefinition = faSurprise;
  public showOrderDetails = false;

  ngOnInit() { }

  constructor(public local_storage: LocalstorageService) {
    local_storage.cartSubject.subscribe((media) => {
      this.allMedia = media;

      this.has_items = local_storage.itemsInCart() > 0;
    });
  }

  remove_from_cart(media) {
    this.local_storage.removeItemFromCart(media);
  }



}
