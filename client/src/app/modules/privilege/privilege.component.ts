import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Role} from "../../core/entity/role";
import {Module} from "../../core/entity/module";
import {Operation} from "../../core/entity/operation";
import {AsyncPipe} from "@angular/common";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatPaginator} from "@angular/material/paginator";
import {PageErrorComponent} from "../../pages/page-error/page-error.component";
import {PageLoadingComponent} from "../../pages/page-loading/page-loading.component";
import {Privilege} from "../../core/entity/privilege";
import {AuthorizationService} from "../../core/service/auth/authorization.service";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../core/entity/user";
import {Observable} from "rxjs";
import {PrivilegeService} from "../../core/service/privilege/privilege.service";

@Component({
  selector: 'app-privilege',
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
  templateUrl: './privilege.component.html',
  styleUrl: './privilege.component.scss'
})
export class PrivilegeComponent implements OnInit{

  isFailed = false;
  isLoading = false;

  privilegeSearchForm:FormGroup;
  privilegeForm:FormGroup;

  roles: Role[] = [];
  modules: Module[] = [];
  operations: Operation[] = [];

  privileges: Privilege[] = [];

  privilege!: Privilege;
  oldprivilege!: Privilege;

  dataSource!: MatTableDataSource<Privilege>;
  data!: Observable<any>
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  enaadd:boolean = false;
  enaupd:boolean = false;
  enadel:boolean = false;

  protected hasUpdateAuthority = this.auths.hasAuthority("Privilege-UPDATE"); //need to be false
  protected hasDeleteAuthority = this.auths.hasAuthority("Privilege-DELETE"); //need to be false
  protected hasWriteAuthority = this.auths.hasAuthority("Privilege-WRITE"); //need to be false
  protected hasReadAuthority = this.auths.hasAuthority("Privilege-READ"); //need to be false

 constructor(
   private fb:FormBuilder,
   private auths: AuthorizationService,
   private ps:PrivilegeService,
   private cdr:ChangeDetectorRef
   ) {
   this.privilegeSearchForm = this.fb.group({
     ssrole:['default',Validators.required],
     ssmodule:['default',Validators.required],
     ssoperation:['default',Validators.required],
   },{updateOn:"change"});

   this.privilegeForm = this.fb.group({
     role:['default',Validators.required],
     module:['default',Validators.required],
     operation:['default',Validators.required],
   },{updateOn:"change"});
 }
  ngOnInit(): void {
    this.initialize();
  }

  initialize(){
    this.loadTable("");
  }

  loadTable(query:string){
    this.ps.getAll(query).subscribe({
      next: value => {
        this.privileges = value;
        this.dataSource = new MatTableDataSource<Privilege>(this.privileges);
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

  delete(privilege: Privilege) {

  }

  clearForm() {

  }

  add() {

  }

  update(privilege: Privilege) {

  }

  fillForm(privilege: Privilege) {

  }
}
