import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Id } from 'src/VOs/Id';
import { Tag } from 'src/models/tasks/tag';
import { BaseService } from '../base.service';

@Injectable({ providedIn: 'root' })
export class TagService extends BaseService {
  constructor(
    private http: HttpClient,
  ) {
    super('/tag');
  }

  static tags: Tag[] = [];
  static tagsObserver: Subject<Tag[]> = new Subject<Tag[]>();
  static tagsMap: Map<string, Tag> = new Map();

  get = (tagId: Id): Observable<Tag[]> => this.http.get<Tag[]>(`${this.baseUrl}/${tagId.value}`);
  getAllByProject = (projectId: string): Observable<Tag[]> => this.http.get<Tag[]>(`${this.baseUrl}/project/${projectId}`);
  create = (model: Tag): Observable<Tag> => this.http.post<Tag>(this.baseUrl, { model });
  update = (model: Tag): Observable<Tag> => this.http.put<Tag>(this.baseUrl, { model });
  delete = (model: Tag): Observable<void> => this.http.delete<void>(`${this.baseUrl}/${model.id}`);

  updateLabels(projectId: string): void {
    this.getAllByProject(projectId).subscribe(tags => {
      TagService.tags = tags;
      TagService.tagsMap = new Map();
      tags.forEach(label => TagService.tagsMap.set(label.id, label));
      TagService.tagsObserver.next(tags);
    });
  }

  static addTag(model: Tag) {
    this.tags.push(model);
    this.tagsMap.set(model.id, model);
    this.tagsObserver.next(this.tags);
  }

  // TODO use this method
  static deleteTag(model: Tag) {
    this.tags = this.tags.filter(label => label.id !== model.id);
    this.tagsMap.delete(model.id);
    this.tagsObserver.next(this.tags);
  }

  static getTags(ids: string[]): Tag[] {
    return ids.map(id => (this.tagsMap.get(id)!));
  }
}