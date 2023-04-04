import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from 'src/models/teams/team';
import { TeamService } from 'src/services/Team/team.service';

@Component({
  selector: 'app-dialog-assign-to-teams',
  templateUrl: 'dialog-assign-to-teams.component.html',
  styleUrls: ['dialog-assign-to-teams.component.sass'],
})
export class DialogAssignToTeams implements OnInit {
  
  constructor(private teamService: TeamService) {this.filteredTeams = this.teamCtrl.valueChanges.pipe(
    map(teamName => this.filter(teamName))
  ); }

  separatorKeysCodes: number[] = [ENTER, COMMA];
  teamCtrl = new FormControl<string>('');
  filteredTeams: Observable<Team[]>;
  teams: Team[] = [];
  allTeams: Team[] = []; 

  @ViewChild('teamInput') teamInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.teamService.getAll().subscribe(res => this.allTeams = res);
  }

  
  private filter(teamName: string | null): Team[] {
    if(!teamName) return this.allTeams;
    teamName = teamName.toLocaleLowerCase();
    return this.allTeams.filter((team) => team.name.toLocaleLowerCase().includes(teamName!));
  }

  add(event: MatChipInputEvent) {
    const value = (event.value || '').trim();

    const filteredTeams = this.filter(value);
    if(filteredTeams.length >= 1)this.teams.push(filteredTeams[0])

    this.resetTeamInput();
  }

  selected(event: MatAutocompleteSelectedEvent) {
    this.teams.push(event.option.value);
    this.resetTeamInput();
  }

  remove(team: Team) {
    this.teams = this.teams.filter(teamF => teamF.id !== team.id);
  }

  private resetTeamInput() {
    this.teamInput.nativeElement.value = '';
    this.teamCtrl.setValue(null);
  }

 
}
