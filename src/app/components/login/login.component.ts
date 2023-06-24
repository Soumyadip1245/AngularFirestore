import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BankdataService } from 'src/app/services/bankdata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formlogin!: FormGroup
  ngOnInit() {

  }
  constructor(private fb: FormBuilder, private fire: AngularFireAuth, private route: Router, private user: BankdataService) {
    this.formlogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  login() {
    this.fire.signInWithEmailAndPassword(this.formlogin.value.email, this.formlogin.value.password).then((value) => {
      this.user.fetchData(this.formlogin.value.email).subscribe((data: any[]) => {
        this.user.useremail = data[0].email
        this.user.userbank = data[0].bankname
        this.user.userprofile = data
        this.route.navigate(['/bank'])
      })
    }).catch((err) => {
      const confirmed = confirm('Not Found. Do you want to register instead?');
      if (confirmed) {
        this.fire.createUserWithEmailAndPassword(this.formlogin.value.email, this.formlogin.value.password).then((value) => {
          const object2 = {
            account: "",
            accounttype: "",
            bankname: "",
            branch: "",
            email: this.formlogin.value.email,
            ifsccode: ""
          }

          this.user.addFirestore(object2)
          alert('Registered Successfully')
          this.formlogin.reset()
        }).catch((e) => {
          console.log(e)
        })
      }
      else {
        this.formlogin.reset()
      }
    })
  }
  googlesign() {
    this.fire.signInWithPopup(new GoogleAuthProvider).then((value) => {

      this.user.fetchData(value.user?.email).subscribe((data: any[]) => {
        console.log(data.length)
        if (data.length == 0) {
          const object2 = {
            account: "",
            accounttype: "",
            bankname: "",
            branch: "",
            email: value.user?.email,
            ifsccode: ""
          }
          this.user.addFirestore(object2)
          this.user.fetchData(this.formlogin.value.email).subscribe((data: any[]) => {
            this.user.useremail = data[0].email
            this.user.userbank = data[0].bankname
            this.user.userprofile = data
            this.user.userprofile = data
            this.route.navigate(['/bank'])
          })
        }
        else {

          this.user.useremail = data[0].email
          this.user.userbank = data[0].bankname
          this.user.userprofile = data
          this.user.userprofile = data
          this.route.navigate(['/bank'])
        }
      })
    })
  }
}

