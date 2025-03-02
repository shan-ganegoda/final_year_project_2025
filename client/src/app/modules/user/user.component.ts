import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Role} from "../../core/entity/role";
import {UserStatus} from "../../core/entity/userstatus";
import {AsyncPipe} from "@angular/common";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatPaginator} from "@angular/material/paginator";
import {PageErrorComponent} from "../../pages/page-error/page-error.component";
import {PageLoadingComponent} from "../../pages/page-loading/page-loading.component";
import {AuthorizationService} from "../../core/service/auth/authorization.service";
import {User} from "../../core/entity/user";
import {MatTableDataSource} from "@angular/material/table";
import {Employee} from "../../core/entity/employee";
import {Observable} from "rxjs";
import {UserService} from "../../core/service/user/user.service";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatGridList,
    MatGridTile,
    MatPaginator,
    PageErrorComponent,
    PageLoadingComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{

  isFailed = false;
  isLoading = false;

  userSearchForm!:FormGroup;

  roles: Role[] = [];
  userstatuses: UserStatus[]= [];
  users: User[] = [];

  protected hasUpdateAuthority = this.auths.hasAuthority("User-UPDATE"); //need to be false
  protected hasDeleteAuthority = this.auths.hasAuthority("User-DELETE"); //need to be false
  protected hasWriteAuthority = this.auths.hasAuthority("User-WRITE"); //need to be false
  protected hasReadAuthority = false //need to be false

  dataSource!: MatTableDataSource<User>;
  data!: Observable<any>
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb:FormBuilder,
              private auths:AuthorizationService,
              private us:UserService,
              private cdr:ChangeDetectorRef
              ) {

    this.userSearchForm = this.fb.group({
      ssusername:[null,[Validators.pattern(/^E[0-9]{3}$/)]],
      ssrole:['default',Validators.required],
      ssuserstatus:['default',Validators.required],
    },{updateOn:'change'})
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(){
    this.loadTable("");
  }

  loadTable(query:string){
    this.us.getAll(query).subscribe({
      next: value => {
        this.users = value;
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.cdr.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.data = this.dataSource.connect();
      },
      error: (err:any) => {
        console.log(err);
      }
    })
  }

  handleSearch() {

  }

  clearSearch() {

  }

  fillForm(user: any) {

  }
}
