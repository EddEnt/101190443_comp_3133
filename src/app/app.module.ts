import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpLink } from 'apollo-angular/http';
import { ApolloModule, gql, Apollo } from 'apollo-angular';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { AppComponent } from './app.component';

import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    ApolloModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
