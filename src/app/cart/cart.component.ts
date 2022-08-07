import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { PaymentService } from '../payment.service';
declare let alertify: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public us:UserService,private router:Router,private pays:PaymentService) { }
  
  cartContents:any=[]
  totalCost:number= 0;
  ngOnInit(): void {
    this.cartContents=this.us.userCart
    console.log(this.cartContents)

    if (this.cartContents.length === 0) {
      alertify.alert('Your Cart is Empty')
      //alert("Your Cart is Empty!")
      this.router.navigateByUrl("/store")
    }

    for (let item of this.cartContents) {
      this.totalCost = this.totalCost + item.quantity*item.cost;
      }
    console.log(this.totalCost)
  }
  

  options = {
    "key": "rzp_test_7HdkaZ1xFGPomB", // Enter the Key ID generated from the Dashboard
    "amount": "500", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Franchise Frizz",
    "description": "Complete Your Payment",
    "image": "",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    // "handler": function (response){
    //     alert(response.razorpay_payment_id);
    //     alert(response.razorpay_order_id);
    //     alert(response.razorpay_signature)
    // },
    "prefill": {
        "name": "",
        "email": "",
        "contact": ""
    },
    "notes": {
        "address": ""
    },
    "theme": {
        "color": "#fcde67"
    }
  };
  
  rzp1: any;
  pay(){
    let cost = this.totalCost*100
    this.options.amount=cost.toString(10)
     this.rzp1 = new this.pays.nativeWindow.Razorpay(this.options);
      this.rzp1.open();
    }

}


