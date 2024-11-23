import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableComponent } from '../components/table/table.component';
import { AddDataComponent } from '../components/add-data/add-data.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TableComponent,AddDataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CRUD';
}
