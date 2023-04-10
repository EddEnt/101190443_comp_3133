import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .query<any>({
        query: gql`
          query: GetUsers {
            users {
              id
              name
              email
            }
          }
        `
      })
      .valueChanges.subscribe(result => {
        this.users = result.data && result.data['users'];
        this.loading = result.loading;
        this.error = result.errors;
      });
  }

}
