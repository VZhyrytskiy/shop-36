import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CartService } from '../../../core/services/cart.service';
import { CartItemModel } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  private cartItems: Array<CartItemModel>;

  private price: number;
  private itemsCount: number;

  private subscription: Subscription;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
    this.subscription = this.cartService.getCardUpdatedEmitter()
      .subscribe((items: Array<CartItemModel>) => this.updateItems(items));
  }

  updateItems(items: Array<CartItemModel>): void {
    this.cartItems = items;
    this.price = this.cartService.getTotalPrice();
    this.itemsCount = this.cartService.getTotalCount();
  }

  trackById(index: any, cartItem: CartItemModel): string {
    return cartItem.id;
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  nonEmpty(): boolean {
    return this.cartItems.length > 0;
  }
}
