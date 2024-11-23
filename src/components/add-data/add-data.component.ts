import { Component } from '@angular/core';
import {ReactiveFormsModule,FormBuilder,FormGroup, Validators} from '@angular/forms';
import { TableComponent } from "../table/table.component";
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-add-data',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-data.component.html',
  styleUrl: './add-data.component.css'
})
export class AddDataComponent {
  constructor(
    private fb:FormBuilder,
    private DS:DataService
  ){}
  updatedData:boolean=false;
  profileForm!:FormGroup;
  index:number=0;
  ngOnInit(): void {    
    this.profileForm = this.fb.group({
      name:['',Validators.required],
      email:['',Validators.required],
      contact:['',Validators.required],
    })
    this.DS.updateData$.subscribe((data :any)=>{
      if(data){
      this.profileForm.patchValue(data);
      const currentData =this.DS.getStoredData();
      this.index = currentData.findIndex((item :any)=>{return item.name===data.name && item.email===data.email && item.contact===data.contact})
      if(data){
      this.updatedData = true;
      }
    }})
  }
  clearall(){
    console.log("hii")
    this.DS.clearAll()
  }
  onSubmit(){
    if (this.profileForm.valid) {
      if(!this.updatedData){
        this.DS.addProfile(this.profileForm.value);
      }else{
        const currentData =this.DS.getStoredData();
        currentData.splice(this.index,1,this.profileForm.value);
        console.log(currentData,this.index);
        localStorage.setItem('user', JSON.stringify(currentData));
        this.DS.profileDataSubject.next(currentData)
        this.updatedData=false
      }
      this.profileForm.reset();
    }
    
  }
}