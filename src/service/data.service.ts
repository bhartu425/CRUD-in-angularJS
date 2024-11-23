import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  profileDataSubject = new BehaviorSubject<any[]>(this.getStoredData());
  profileData$ = this.profileDataSubject.asObservable();
  
  private updateDataSubject = new BehaviorSubject<any[] | null>(null);
  updateData$ = this.updateDataSubject.asObservable();

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  getStoredData() {
    if (this.isBrowser()) {
      const storedData = localStorage.getItem('user');
      return storedData ? JSON.parse(storedData) : [];
    }
    return [];
  }

  addProfile(profile: any) {
    if (this.isBrowser()) {
      const currentData = this.getStoredData();
      currentData.push(profile);
      localStorage.setItem('user', JSON.stringify(currentData));
      this.profileDataSubject.next(currentData);
    }
  }
  clearAll(){
    localStorage.clear();
    this.profileDataSubject.next([])
  }
  deleteItem(index:number){
    const currentData =this.getStoredData();
    currentData.splice(index,1)
    localStorage.setItem('user',JSON.stringify(currentData));
    this.profileDataSubject.next(currentData);
  }
  updateItem(index:number){
    const currentData = this.getStoredData();
    const data =currentData[index];
    this.updateDataSubject.next(data);
  }
}
