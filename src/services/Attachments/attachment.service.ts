import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileDTO } from 'src/models/attachments/attachment';
import { ItemDTO } from 'src/models/tasks/item';
import { BaseService } from '../base.service';

@Injectable({ providedIn: 'root' })

export class AttachmentService extends BaseService {
    constructor(
        private http: HttpClient,
    ) {
        super('/file');
    }

    getAllByItemId = (itemId: string): Observable<FileDTO[]> => this.http.get<FileDTO[]>(`${this.baseUrl}/item/${itemId}`);

    get = (projectId: string, fileId: string): Observable<Buffer> => this.http.get<Buffer>(`${this.baseUrl}/${projectId}/${fileId}`);
    create = (item: ItemDTO, id: string, file: File): Observable<void> => {
        const data = new FormData();
        data.append(id, file, file.name);
        data.append('itemId', item.id);
        data.append('projectId', item.projectId);
        return this.http.post<any>(this.baseUrl, data);
    }
    edit = (model: FileDTO): Observable<void> => this.http.put<void>(this.baseUrl, { model });
    delete = (itemId: string, file: FileDTO): Observable<void> => this.http.delete<void>(`${this.baseUrl}/${file.id}?itemId=${itemId}`);
}