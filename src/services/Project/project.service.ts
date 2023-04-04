import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColumnDTO, ProjectDTO } from 'src/models/tasks/dashboard';
import { Id } from 'src/VOs/Id';
import { BaseService } from '../base.service';

@Injectable({ providedIn: 'root' })
export class ProjectService extends BaseService {
  constructor(private http: HttpClient) {
    super('/project')
  }

  getAll = (): Observable<ProjectDTO[]> => this.http.get<ProjectDTO[]>(this.baseUrl);
  get = (id: string): Observable<ProjectDTO> => this.http.get<ProjectDTO>(`${this.baseUrl}/${id}`);
  getPopulated = (id: string): Observable<ProjectDTO> => this.http.get<ProjectDTO>(`${this.baseUrl}/populated/${id}`);
  getAllByTeam = (teamId: Id): Observable<ProjectDTO[]> => this.http.get<ProjectDTO[]>(`${this.baseUrl}/team/${teamId.value}`);

  create = (model: ProjectDTO): Observable<ProjectDTO> => this.http.post<ProjectDTO>(this.baseUrl, { model });
  save = (model: ProjectDTO): Observable<ProjectDTO> => {
    const modelCopy = structuredClone(model);
    modelCopy.columns = modelCopy.columns.map((column: ColumnDTO) => {
      //TODO create a new DTO to avoid this
      delete column.items;
      return column;
    });
    return this.http.put<ProjectDTO>(this.baseUrl, { model: modelCopy })
  }
  delete = (model: ProjectDTO): Observable<boolean> => this.http.delete<boolean>(`${this.baseUrl}/${model.id}`);

  importTrello = (model: any, teamId: Id): Observable<void> => this.http.post<void>(`${this.baseUrl}/import/trello`, { model, teamId: teamId.value });
}