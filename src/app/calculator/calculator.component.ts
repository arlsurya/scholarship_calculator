import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
declare var $: any;


interface Subject {
  name: string;
  sound: string;
}
interface rank {
  name: string;
  sound: string;
}
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  reload(){
    location.reload();
  }
 
 
  

  subject1control = new FormControl<Subject | null>(null, Validators.required);
  subject2control = new FormControl<Subject | null>(null, Validators.required);
  subject3control = new FormControl<Subject | null>(null, Validators.required);
  subject4control = new FormControl<Subject | null>(null, Validators.required);
  subject5control = new FormControl<Subject | null>(null, Validators.required);

 
  constructor() {
    
    
    
    // console.log(this.test1+this.test2);
    
   }
  
  // test1:number= 5;
  // test2:number= 4;

  disabled1:boolean=false;
  disabled2:boolean=false;
  disabled3:boolean=false;
  disabled4:boolean=false;
  disabled5:boolean=false;
  disabled6:boolean=false;
  disabled7:boolean=false;
  

  first:any = 'First';
  second:any = 'Second';
  third:any = 'Third';

  sub1name:string = 'English'
  sub2name:string = 'Math/Science/Nepali'
  sub3name:string = 'Physics/Business Studies'
  sub4name:string = 'Chemistry/Economics'
  sub5name:string = 'Bio or Comp/Math-Mgmt'




  totalFee:number = 80000;

  // sub1name:string= 'English';
  // sub2name:string= 'Nepali';
  // sub3name:string= 'Math';
  // sub4name:string= 'Science';
  // sub5name:string= 'Account';

  
  sub1:any= '-';
  sub2:any= '-';
  sub3:any= '-';
  sub4:any= '-';
  sub5:any= '-';


  Aplus:number = 6;
  A:number = 4;
  Bplus:number =3;
  B:number=2;

  english:number = 0;
  nepali:number = 0;
  math:number = 0;
  science:number = 0;
  account:number = 0;

  sum:number = 0 ;
  rank:number = 0;
  top:any ='-';

  

  // rankText:any = "";
  
  topH:any ='-';
  topS:any = '';

  condition:boolean= true;

  topText:number = 0;

  lessP:number= 0 ;
  lessFirst:number = this.totalFee;

  secondS:number= 0;
  less2:number=this.totalFee;

thirdS:number=0;
less3:number=this.totalFee;

totalAmt:number=0 ;
netFee:number=80000;

disable1:boolean = false;
disable2:boolean = false;
disable3:boolean = false;
disable4:boolean = false;
disable5:boolean = false;

  rankData(data:any){
    // console.log(data);
    this.rank = data;
    // console.log(data.target);

    var text:any = $('#rank').find(":selected").text();
    
    this.top = text;
    
    
    
  }
  top100(data:any){
    // console.log(data);
    console.log(data);
    
    this.topH = data;
    if(this.topH == "Yes"){
      this.condition = false;
      
      
    }
    else{
      this.condition = true;
    }

    
  }

  englishPick(val:any){
   
   console.log(val);
   console.log("eng");
   
   
    
    var English = val;
    this.sub1 = English;
    console.log(this.sub1);
    

   if(this.sub1 == 'A+'){
      this.english = this.Aplus;
      
    }
      else if(this.sub1=='A'){
      this.english=4
    }else if(this.sub1=='B+'){
      this.english=3
    }else if (this.sub1=='B'){
      this.english=2
    }

    this.disabled1 = true;

    
    

  }
  nepaliPick(val:any){
    var Nepali = val;
    this.sub2 = Nepali;
    console.log(this.sub2);
    
    if(this.sub2 == 'A+'){
      this.nepali = 6;
      
      
    }else if(this.sub2=='A'){
      this.nepali=4
    }else if(this.sub2=='B+'){
      this.nepali=3
    }else if (this.sub2=='B'){
      this.nepali=2
    }
    this.disabled2 = true;
  }

  mathPick(val:any){
    var Math = val;
    this.sub3 = Math;
    if(this.sub3 == 'A+'){
      this.math = 6;
      
    }else if(this.sub3=='A'){
      this.math=4
    }else if(this.sub3=='B+'){
      this.math=3
    }else if (this.sub3=='B'){
      this.math=2
    }
    this.disabled3 = true;
  }

  sciencePick(val:any){
    var Science = val;
    this.sub4 = Science;
    if(this.sub4 == 'A+'){
      this.science = 6;
      
    }else if(this.sub4=='A'){
      this.science=4
    }else if(this.sub4=='B+'){
      this.science=3
    }else if (this.sub4=='B'){
      this.science=2
    }
    this.disabled4 = true;

  }

  accountPick(val:any){
    var Account = val;
    this.sub5 = Account;

    if(this.sub5 == 'A+'){
      this.account = 6;
      
    }else if(this.sub5=='A'){
      this.account=4
    }else if(this.sub5=='B+'){
      this.account=3
    }else if (this.sub5=='B'){
      this.account=2
    }
    this.disabled5 = true;




  }

  
  changedata(data:any){
    console.log("valchange");
    console.log(data);
    
    
   
    


    
    if(this.sub1 == "A+" && this.sub2=="A+"){
     console.log("working");
     
      this.english = 7;
      this.nepali = 7;
      
      
    }

    if(this.sub1== "A+" && this.sub3=="A+"){
      this.english=7;
      this.math=7;
    }
    if(this.sub1== "A+" && this.sub4=="A+"){
      this.english=7;
      this.science=7;
    }
    if(this.sub1== "A+" && this.sub5=="A+"){
      this.english=7;
      this.account=7;
    }
    if(this.sub2== "A+" && this.sub3=="A+"){
      this.nepali=7;
      this.math=7;
    }
    if(this.sub2== "A+" && this.sub4=="A+"){
      this.nepali=7;
      this.science=7;
    }
    if(this.sub2== "A+" && this.sub5=="A+"){
      this.nepali=7;
      this.account=7;
    }
    if(this.sub3== "A+" && this.sub4=="A+"){
      this.math=7;
      this.science=7;
    }
    if(this.sub3== "A+" && this.sub5=="A+"){
      this.math=7;
      this.account=7;
    }
    if(this.sub4== "A+" && this.sub5=="A+"){
      this.science=7;
      this.account=7;
    }

    if(this.sub2 =="A+" && this.sub3 =="A+" && this.sub4=="A+"){
      this.nepali = 8;
      this.math = 8;
      this.science = 8;
    }
    if(this.sub2 =="A+" && this.sub4 =="A+" && this.sub5=="A+"){
      this.nepali = 8;
      this.science = 8;
      this.account = 8;
    }




 
    
    
    
    
    if(this.sub1 =="A+" && this.sub2== "A+" && this.sub3 =="A+"){
      this.english = 8;
      this.nepali = 8;
      this.math = 8;

    }
    if(this.sub1 =="A+" && this.sub2== "A+" && this.sub4 =="A+"){
      this.english = 8;
      this.nepali = 8;
      this.science = 8;
    }
    if(this.sub1 =="A+" && this.sub2== "A+" && this.sub5 =="A+"){
      this.english = 8;
      this.nepali = 8;
      this.account = 8;
    }
    if(this.sub1 =="A+" && this.sub3== "A+" && this.sub4 =="A+"){
      this.english = 8;
      this.math = 8;
      this.science = 8;
    }
    if(this.sub1 =="A+" && this.sub3== "A+" && this.sub5 =="A+"){
      this.english = 8;
      this.math = 8;
      this.account = 8;
    }
    if(this.sub1 =="A+" && this.sub4== "A+" && this.sub5 =="A+"){
      this.english = 8;
      this.science = 8;
      this.account = 8;
    }
    if(this.sub1=="A+" && this.sub2=="A+" && this.sub3=="A+" && this.sub4 =="A+"){
    
   
    
      this.english = 9;
      this.nepali = 9;
      this.math = 9;
      this.science = 9;
      
    }




    if(this.sub1 =="A+" && this.sub2== "A+" && this.sub3=="A+" && this.sub5 =="A+"){
      this.english = 9;
      this.nepali = 9;
      this.math = 9;
      this.account=9;
    }
    if(this.sub1 =="A+" && this.sub3== "A+" && this.sub4=="A+" && this.sub5 =="A+"){
      this.english = 9;
      this.math = 9;
      this.science = 9;
      this.account=9;
    }
    if(this.sub2 =="A+" && this.sub3== "A+" && this.sub4=="A+" && this.sub5 =="A+"){
      this.nepali = 9;
      this.math = 9;
      this.science = 9;
      this.account=9;
    }
    if(this.sub1=="A+" && this.sub2=="A+" && this.sub3=="A+" && this.sub4 =="A+" && this.sub5=="A+"){
    
    
    
      this.english = 10;
      this.nepali = 10;
      this.math = 10;
      this.science = 10;
      this.account =10;
      
    }

    


    
    // var a = parseInt($("#eng").text());
    // var b = parseInt($("#nep").text());
    // var c = parseInt($("#math").text());
    // var d = parseInt($("#science").text());
    // var e = parseInt($("#acc").text());

    var a = this.english;
    var b = this.nepali;
    var c = this.math;
    var d = this.science;
    var e = this.account;
    // var f = parseInt($("#rank").text())
    // var f = 
    // var a:number = this.english;
    
    // var sum1 =a +this.sum ;
    var sum1 =a + b + c + d + e ;
    console.log(sum1);
    
    
    this.sum = sum1;
    // console.log(this.rank);

    // var t:number = this.totalFee;
    // var p:number = this.sum;

    // console.log(t,p);
    // var cal:number = t * p * 1/100;
    // console.log(cal);
    
    



    // this.lessP = this.totalFee * this.sum;

    this.lessP = this.totalFee * this.sum /100;

    this.lessFirst = this.totalFee - this.lessP;

    this.secondS = this.lessFirst * this.rank * 1/100;
    


    this.less2 = this.lessFirst - this.secondS;
    this.less3 = this.less2 - this.thirdS;


    // this.thirdS = this.less2 * this.topText * 1/100;

    if(this.topH == "Yes"){
      this.topText = 10;
    }
    if(this.topH == "NO"){
      this.topText= 0;
    }
    if(this.topH == "Select a Option"){
      this.topText=0;
    }
    
  

    this.thirdS = this.less2 * this.topText/100 ;
    // console.log(this.less2);
    // console.log(this.topText);
    
    

    // this.thirdS = 
    // this.topText = 

    console.log(this.topH);

    this.totalAmt = this.lessP + this.secondS + this.thirdS;

    this.netFee = this.totalFee - this.totalAmt;

   


    
    

  }




  ngOnInit(): void {
  }

}
