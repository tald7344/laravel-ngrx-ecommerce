import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AdminConfig} from '../../pages/AdminConfig';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }


  resetDropZoneUpload(imageURL: string, fileName: string, storedPath: string, id = null): Observable<any> {
    return this.httpClient.post<any>(
      AdminConfig.resetUploadAPI,
      {
        imageUrl: imageURL,
        file_name: fileName,
        stored_path: storedPath,
        id
      }
    );
  }

  // Admin Section - Upload Image For Category
  public uploadImage(image: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', image);
    return this.httpClient.post<string>(`${AdminConfig.uploadAPI}`, formData);
  }

}
