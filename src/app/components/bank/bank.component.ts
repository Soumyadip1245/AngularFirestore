import { Component } from '@angular/core';
import { BankdataService } from 'src/app/services/bankdata.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent {
  email:any
  accountnumber: any 
  bankname: any
  ifsccode: any
  location:any
  type: any
  isLoading: boolean = true;
  isEmpty:boolean= false
  dataarray: any = []
  isEditingCode: boolean = true
  constructor(private user: BankdataService){
   setTimeout(()=>{
    this.email = this.user.useremail
    this.isLoading = false;
    this.checkdata()
   },2000)
  }
  addDetails(){
    var data = {
      account: this.user.userprofile[0].id,
      bankname: this.bankname,
      ifsccode: this.ifsccode,
      branch: this.location,
      accounttype: this.type
    }
   this.user.updateData(this.user.userprofile[0].id,data)
   this.checkdata()
  }
  checkdata() {
    this.accountnumber = this.user.userprofile[0].id
    this.user.fetchData(this.user.userprofile[0].email).subscribe((data:any[])=>{
      if (data[0].bankname === "" || data[0].bankname[0].bankname === null) {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
        this.dataarray = data
      }
    })
    
  }
  
  enableEdit(i:any){
    i.isEditingCode = !i.isEditingCode;
    i.isEditingBranch = !i.isEditingBranch;
  }
  editData(id:any){
    var data = {
      "branch": id.branch,
      "ifsccode": id.ifsccode
    }
    id.isEditingCode = !id.isEditingCode;
    id.isEditingBranch = !id.isEditingBranch;
   this.user.updateData(this.user.userprofile[0].id,data)
  }
  deleteedit(){
    var data = {
      "account": "",
       "branch" : "",
       "ifsccode" : "",
       "bankname" : "",
       "accounttype" : ""
    }
    const confirmed = confirm('Do you want to delete data');
    if(confirmed){
     this.user.updateData(this.user.userprofile[0].id,data)
     
    }
    else{
      console.log("Delete")
    }
    this.checkdata()
  }
}
