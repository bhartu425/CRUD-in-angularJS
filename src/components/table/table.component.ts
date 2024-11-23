import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  profileData: any[] = [];
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.profileData$.subscribe(data=>{
      this.profileData = data;
    })  
  }
  deleteOne(i:number){
    this.dataService.deleteItem(i);
  }
  update(i:number){
    this.dataService.updateItem(i);
  }
}
