import { Injectable } from '@angular/core';
import { AuthProvider } from 'src/app/auth-providers/AuthType';
import { ColumnDTO, ProjectDTO } from 'src/models/tasks/dashboard';
import { ItemDTO, Priority } from 'src/models/tasks/item';
import { Team } from 'src/models/teams/team';
import { User } from 'src/models/user';
import { AnalitycsEvent, AnalitycsPurchase } from 'src/types/analytics';
import { SessionManagerService } from '../SessionManager/session-manager.service';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {

  constructor(private sessionManager: SessionManagerService) { }

  private config = (configInfo: string, data?: any) => window.gtag('config', configInfo, data);
  private get = (target: string, fieldName: string, callback?: any) => window.gtag('get', target, fieldName, callback);
  private set = (data: Object) => window.gtag('set', data);
  private event = (eventName: string, data?: any) => window.gtag('event', eventName, data);
  private consent = (arg: Object, params: Object) => window.gtag('consent', arg, params);

  private addUserData(data: any = {}) {
    if (!data) data = {};
    const user = this.sessionManager.getUser();
    if (user) {
      data.userId = user.id;
      data.userName = user.name;
      data.userLastname = user.lastname;
      data.userEmail = user.email;
      data.userLocale = user.locale;
    }
  }

  private isGtag(): boolean {
    return window.gtag !== undefined;
  }

  private trackEvent(eventName: string, data: AnalitycsEvent = {}) {
    if (!this.isGtag()) return;
    this.addUserData(data);
    this.event(eventName, data);
  }

  userRegistered(user: User, provider: AuthProvider = 'buildin') {
    this.trackEvent('UserRegistered', {
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
      userLastname: user.lastname,
      userLocale: user.locale,
      provider,
    });
  }

  userLogin(user: User, provider: AuthProvider = 'buildin') {
    this.trackEvent('UserLogin', {
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
      userLastname: user.lastname,
      userLocale: user.locale,
      provider,
    });
  }

  trelloImport(team: Team) {
    this.trackEvent('TrelloImport', {
      teamId: team.id,
      teamName: team.name,
    });
  }

  projectCreate(project: ProjectDTO) {
    this.trackEvent('ProjectCreated', {
      projectId: project.id,
      projectName: project.name,
      projectTeamId: project.team,
      projectColor: project.color,
      projectColor2: project.color2,
    });
  }

  projectUpdate(project: ProjectDTO) {
    this.trackEvent('ProjectUpdated', {
      projectId: project.id,
      projectName: project.name,
      projectTeamId: project.team,
      projectColor: project.color,
      projectColor2: project.color2,
      projectColumns: project.columns,
      projectColumnsSize: project.columns.length,
    });
  }

  projectDelete(project: ProjectDTO) {
    this.trackEvent('ProjectDeleted', {
      projectId: project.id,
      projectName: project.name,
      projectTeamId: project.team,
      projectColor: project.color,
      projectColor2: project.color2,
      projectColumns: project.columns,
      projectColumnsSize: project.columns.length,
    });
  }

  columnCreate(column: ColumnDTO, projectId: string) {
    this.trackEvent('ColumnCreated', {
      projectId,
      columnId: column.id,
      columnName: column.name,
    })
  }

  columnUpdate(column: ColumnDTO, projectId: string) {
    this.trackEvent('ColumnUpdated', {
      projectId,
      columnId: column.id,
      columnName: column.name,
    })
  }

  columnDelete(column: ColumnDTO, projectId: string) {
    this.trackEvent('ColumnDeleted', {
      projectId,
      columnId: column.id,
      columnName: column.name,
    })
  }

  itemCreate(item: ItemDTO) {
    this.trackEvent('ItemCreated', {
      projectId: item.projectId,
      columnId: item.column,
      itemId: item.id,
      itemName: item.name,
    });
  }

  itemMove(item: ItemDTO, column: ColumnDTO, projectId: string) {
    this.trackEvent('ItemMoved', {
      projectId,
      columnId: column.id,
      itemId: item.id,
      itemName: item.name,
    });
  }

  itemOpen(item: ItemDTO) {
    this.trackEvent('ItemOpened', {
      projectId: item.projectId,
      columnId: item.column,
      itemId: item.id,
      itemName: item.name,
      itemIndex: item.index,
      itemDescription: item.description,
      itemTags: item.tags,
      itemTagsSize: item.tags?.length ?? 0,
      itemDateStart: item.date?.start,
      itemDateEnd: item.date?.end,
      itemPriority: item.priority,
      itemUsersSize: item.userIds?.length ?? 0,
      itemSubtasksSize: item.subtasks?.length ?? 0,
      itemTimeTotal: item.time.total,
      itemTimeSpent: item.time.spent,
    });
  }


  itemUpdate(item: ItemDTO) {
    this.trackEvent('ItemUpdated', {
      projectId: item.projectId,
      columnId: item.column,
      itemId: item.id,
      itemName: item.name,
      itemIndex: item.index,
      itemDescription: item.description,
      itemTags: item.tags,
      itemTagsSize: item.tags?.length ?? 0,
      itemDateStart: item.date?.start,
      itemDateEnd: item.date?.end,
      itemPriority: item.priority,
      itemUsersSize: item.userIds?.length ?? 0,
      itemSubtasksSize: item.subtasks?.length ?? 0,
      itemTimeTotal: item.time.total,
      itemTimeSpent: item.time.spent,
    });
  }

  itemChangeName(item: ItemDTO, newName: string) {
    this.trackEvent('ItemChangedName', {
      itemOldName: item.name,
      itemNewName: newName,

      projectId: item.projectId,
      columnId: item.column,
      itemId: item.id,
      itemIndex: item.index,
      itemDescription: item.description,
      itemTags: item.tags,
      itemTagsSize: item.tags?.length ?? 0,
      itemDateStart: item.date?.start,
      itemDateEnd: item.date?.end,
      itemPriority: item.priority,
      itemUsersSize: item.userIds?.length ?? 0,
      itemSubtasksSize: item.subtasks?.length ?? 0,
      itemTimeTotal: item.time.total,
      itemTimeSpent: item.time.spent,
    });
  }

  itemChangeTime(item: ItemDTO) {
    this.trackEvent('ItemChangedTime', {
      projectId: item.projectId,
      columnId: item.column,
      itemId: item.id,
      itemName: item.name,
      itemIndex: item.index,
      itemDescription: item.description,
      itemTags: item.tags,
      itemTagsSize: item.tags?.length ?? 0,
      itemDateStart: item.date?.start,
      itemDateEnd: item.date?.end,
      itemPriority: item.priority,
      itemUsersSize: item.userIds?.length ?? 0,
      itemSubtasksSize: item.subtasks?.length ?? 0,
      itemTimeTotal: item.time.total,
      itemTimeSpent: item.time.spent,
    });
  }

  itemChangePriority(item: ItemDTO, newPriority: Priority) {
    this.trackEvent('ItemChangedPriority', {
      itemOldPriority: item.priority,
      itemNewPriority: newPriority,

      projectId: item.projectId,
      columnId: item.column,
      itemId: item.id,
      itemName: item.name,
      itemIndex: item.index,
      itemDescription: item.description,
      itemTags: item.tags,
      itemTagsSize: item.tags?.length ?? 0,
      itemDateStart: item.date?.start,
      itemDateEnd: item.date?.end,
      itemUsersSize: item.userIds?.length ?? 0,
      itemSubtasksSize: item.subtasks?.length ?? 0,
      itemTimeTotal: item.time.total,
      itemTimeSpent: item.time.spent,
    });
  }

  itemDelete(item: ItemDTO) {
    this.trackEvent('ItemDeleted', {
      projectId: item.projectId,
      columnId: item.column,
      itemId: item.id,
      itemName: item.name,
      itemIndex: item.index,
      itemDescription: item.description,
      itemTags: item.tags,
      itemTagsSize: item.tags?.length ?? 0,
      itemDateStart: item.date?.start,
      itemDateEnd: item.date?.end,
      itemPriority: item.priority,
      itemUsersSize: item.userIds?.length ?? 0,
      itemSubtasksSize: item.subtasks?.length ?? 0,
      itemTimeTotal: item.time.total,
      itemTimeSpent: item.time.spent,
    });
  }

  teamCreate(team: Team) {
    this.trackEvent('TeamCreated', {
      teamId: team.id,
      teamName: team.name,
    });
  }

  teamUpdate(team: Team) {
    this.trackEvent('TeamUpdated', {
      teamId: team.id,
      teamName: team.name,
      teamMembersSize: team.members.length,
    });
  }

  teamDelete(team: Team) {
    this.trackEvent('TeamDeleted', {
      teamId: team.id,
      teamName: team.name,
      teamMembersSize: team.members.length,
    });
  }

  trackPurchase(data: AnalitycsPurchase) {
    this.trackEvent('purchase', data);
  }
}