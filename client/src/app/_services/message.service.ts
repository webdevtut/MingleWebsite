import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Message } from '../_models/message';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  baseUrl = "https://localhost:5001/api/";


  constructor(private http: HttpClient) { }


  getMessages(pageNumber: number, pageSize : number, container: string){
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);
    return getPaginatedResult<Message[]>(this.baseUrl+'messages', params, this.http);
  }

  getMessagesThread(username: string){
    return this.http.get<Message[]>(this.baseUrl + 'messages/thread/' + username);
  }
  
  sendMessage(username : string, content: string){
    return this.http.post<Message>(this.baseUrl + 'messages', {recipientUsername: username, content})
  }
}
