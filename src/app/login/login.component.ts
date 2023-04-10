import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { MutationResult } from 'apollo-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(private apollo: Apollo) {
    this.email = '';
    this.password = '';
  }

  login() {
    this.apollo.mutate({
      mutation: gql`
        mutation LoginUser($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            token
          }
        }
      `,
      variables: {
        email: this.email,
        password: this.password
      }
    }).subscribe((result: MutationResult) => {
      console.log(result);
    });
  }
}
