import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
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
import {EmployeeService} from "../../core/service/employee/employee.service";
import {UserstatusService} from "../../core/service/user/userstatus.service";
import {RoleService} from "../../core/service/user/role.service";
import {RegexService} from "../../core/service/regexes/regex.service";

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
  userForm!:FormGroup;

  oldUser!: User;
  user!: User;

  regexes: any;

  roles: Role[] = [];
  userstatuses: UserStatus[]= [];
  employees: Employee[] = [];
  users: User[] = [];

  protected hasUpdateAuthority = this.auths.hasAuthority("User-UPDATE"); //need to be false
  protected hasDeleteAuthority = this.auths.hasAuthority("User-DELETE"); //need to be false
  protected hasWriteAuthority = this.auths.hasAuthority("User-WRITE"); //need to be false
  protected hasReadAuthority = this.auths.hasAuthority("User-READ"); //need to be false

  enaadd:boolean = false;
  enaupd:boolean = false;
  enadel:boolean = false;

  dataSource!: MatTableDataSource<User>;
  data!: Observable<any>
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb:FormBuilder,
              private auths:AuthorizationService,
              private us:UserService,
              private cdr:ChangeDetectorRef,
              private es:EmployeeService,
              private uss:UserstatusService,
              private rs:RoleService,
              private rx:RegexService
              ) {

    this.userSearchForm = this.fb.group({
      ssusername:[null,[Validators.pattern(/^E[0-9]{3}$/)]],
      ssrole:['default',Validators.required],
      ssuserstatus:['default',Validators.required],
    },{updateOn:'change'})

    this.userForm = this.fb.group({
      "username": new FormControl('',[Validators.required]),
      "password": new FormControl('',[Validators.required]),
      "description": new FormControl('',[Validators.required]),
      "employee": new FormControl(null,[Validators.required]),
      "userstatus": new FormControl(null,[Validators.required]),
      "role": new FormControl(null,[Validators.required]),
    },{updateOn:'change'})
  }

  ngOnInit(): void {
    this.initialize();

    this.es.getAll("").subscribe({
      next: data => {
        this.employees = data;
      }
    })

    this.uss.getAll().subscribe({
      next: data => {
        this.userstatuses = data;
      }
    })

    this.rs.getAll().subscribe({
      next: data => {
        this.roles = data;
      }
    })

    this.rx.getRegexes('user').subscribe({
      next:data => {
        this.regexes = data;
        this.createForm();
      },
      error: () => this.regexes = [] || undefined
    });

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

  createForm(){
    this.userForm.controls['username'].setValidators([Validators.required, Validators.pattern(this.regexes['username']['regex'])]);
    this.userForm.controls['password'].setValidators([Validators.required, Validators.pattern(this.regexes['password']['regex'])]);
    this.userForm.controls['description'].setValidators([Validators.required, Validators.pattern(this.regexes['description']['regex'])]);
    this.userForm.controls['role'].setValidators([Validators.required]);
    this.userForm.controls['employee'].setValidators([Validators.required]);
    this.userForm.controls['userstatus'].setValidators([Validators.required]);

    Object.values(this.userForm.controls).forEach( control => { control.markAsTouched(); } );

    for (const controlName in this.userForm.controls) {
      const control = this.userForm.controls[controlName];
      control.valueChanges.subscribe(value => {

          if (this.oldUser != undefined && control.valid) {
            // @ts-ignore
            if (value === this.user[controlName]) {
              control.markAsPristine();
            } else {
              control.markAsDirty();
            }
          } else {
            control.markAsPristine();
          }
        }
      );

    }
    this.enableButtons(true,false,false);
  }

  enableButtons(add:boolean, upd:boolean, del:boolean){
    this.enaadd=add;
    this.enaupd=upd;
    this.enadel=del;
  }

  fillForm(user:User){
    this.enableButtons(false,true,true);

    //this.selectedRow = employee;

    this.user = user;
    this.oldUser = this.user;

    this.userForm.setValue({
      username: this.user.username,
      password: this.user.password,
      description: this.user.description,

      userstatus: this.user.userstatus?.id,
      employee: this.user.employee?.id,
      role: this.user.role?.id,
    });

    this.userForm.markAsPristine();

  }

  handleSearch() {

  }

  clearSearch() {

  }


  add() {

  }

  update(user: User) {

  }

  delete(user: User) {

  }

  clearForm() {

  }
}
