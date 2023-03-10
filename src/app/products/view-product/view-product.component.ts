import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscriber } from 'rxjs';
import { ApiService } from '../services/api.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

productId:any;
viewProduct:any;
  constructor (private activatedRoute:ActivatedRoute, private api:ApiService, private cart:CartService){

  }
ngOnInit(): void {
  // fetch pathparameter from url
  this.activatedRoute.params
  .subscribe((data:any)=>{
    console.log(data['id']);
    this.productId = data['id']
  })
  // to get details of requested products
  this.api.viewProduct(this.productId)
  .subscribe((result:any)=>{
    console.log(result.Products);
    this.viewProduct=result.Products
    
  })
}

// add to wishlist
addtowishlist(product:any){
  this.api.addtowishlist(product)
  .subscribe((result:any)=>{
    alert(result.message)
  },
  (result:any)=>{
    alert(result.error.message)
  })

}

// addToCart(viewProduct)
addToCart(product:any){
this.cart.addToCart(product)
}

}
