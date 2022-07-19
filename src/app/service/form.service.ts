import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

const ELEMENT_DATA: User[] = [

];


@Injectable({
  providedIn: 'root'
})
export class FormService {

  users: User[] = [];

  constructor() { }

  addToTable(user: User) {
    const findUser = this.users.find(element => element == user)
    if(findUser != undefined){
      return "Esse usuario já existe!";
    }

    if(user.name == null || user.telephone == null){
      return "Favor preencher corretamente os campos!";
    }

    user.id = this.users.length+1;
    this.users.push(user);
    return true;
  }

  getItems() {
    return this.users;
  }

  clearTable() {
    this.users = [];
    return this.users;
  }

  DeleteUser(user: User){
    this.users = this.users.filter(obj => obj !== user)
  }
}
