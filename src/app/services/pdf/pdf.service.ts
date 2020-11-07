import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as global from '../../../global'

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  private pdfUrl: string;

  constructor(private http: HttpClient) {
    this.pdfUrl = global.BACKEND_URL + '/pdf';
  }

  getListPdf (listId: number) {
    var url = this.pdfUrl + "/lists/" + listId;
    return this.http.get(url);
  }
}