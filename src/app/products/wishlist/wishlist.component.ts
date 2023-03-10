import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  Wishlist:any;
  wishlistStatusMsg=''

constructor(private api:ApiService, private cart:CartService){}


ngOnInit(): void {
  this.api.getWishlist()
  .subscribe(
    (result:any)=>{
     this.Wishlist =result.Wishlist 
     if(this.Wishlist.length==0){
      this.wishlistStatusMsg="Wishlist Empty"
     }
     
    },
    (result:any)=>{
      if(result.error.message){
  this.wishlistStatusMsg ='Wishlist Empty'
      }
    }
    
  )
  
}
removeItem(productId:any){
this.api.removeItemFromWishlist(productId)
.subscribe(
  // 200
  (result:any)=>{
    this.Wishlist=result.Wishlist
    console.log(this.Wishlist);
    if(this.Wishlist.length==0){
      this.wishlistStatusMsg="Wishlist Empty"
     }
    
   

},
// 400
(result:any)=>{
  alert(result.error.message)
}
)    
}

// addToCart
addToCart(product:any){
this.cart.addToCart(product)
}

}
