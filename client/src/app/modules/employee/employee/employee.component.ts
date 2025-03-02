import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatPaginator} from "@angular/material/paginator";
import {Employee} from "../../../core/entity/employee";
import {Gender} from "../../../core/entity/gender";
import {Designation} from "../../../core/entity/designation";
import {EmployeeType} from "../../../core/entity/employeetype";
import {EmployeeStatus} from "../../../core/entity/employeestatus";
import {MatTableDataSource} from "@angular/material/table";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {EmployeeService} from "../../../core/service/employee/employee.service";
import {GenderService} from "../../../core/service/employee/gender.service";
import {DesignationService} from "../../../core/service/employee/designation.service";
import {ToastService} from "../../../core/util/toast.service";
import {EmployeetypeService} from "../../../core/service/employee/employeetype.service";
import {EmployeestatusService} from "../../../core/service/employee/employeestatus.service";
import {AsyncPipe} from "@angular/common";
import {RegexService} from "../../../core/service/regexes/regex.service";
import {ConfirmDialogComponent} from "../../../shared/dialog/confirm-dialog/confirm-dialog.component";
import {AuthorizationService} from "../../../core/service/auth/authorization.service";
import {WarningDialogComponent} from "../../../shared/dialog/warning-dialog/warning-dialog.component";
import {PageLoadingComponent} from "../../../pages/page-loading/page-loading.component";
import {PageErrorComponent} from "../../../pages/page-error/page-error.component";

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatGridList,
    MatGridTile,
    MatPaginator,
    AsyncPipe,
    PageLoadingComponent,
    PageErrorComponent
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit{
  isFailed = false;
  isLoading = false;

  employees: Employee[] = [];
  genders: Gender[] = [];
  designations: Designation[] = [];
  emptypes: EmployeeType[] = [];
  employeestatuses: EmployeeStatus[] = [];

  regexes:any;

  oldEmployee!: Employee;
  employee!:Employee;
  selectedRow!:Employee;

  currentOperation = '';

  imageempurl: any = 'assets/tabledefault.png';

  protected hasUpdateAuthority = this.auths.hasAuthority("Employee-UPDATE"); //need to be false
  protected hasDeleteAuthority = this.auths.hasAuthority("Employee-DELETE"); //need to be false
  protected hasWriteAuthority = this.auths.hasAuthority("Employee-WRITE"); //need to be false
  protected hasReadAuthority = this.auths.hasAuthority("Employee-READ"); //need to be false

  employeeSearchForm:FormGroup;
  employeeForm!:FormGroup;

  dataSource!: MatTableDataSource<Employee>;
  data!: Observable<any>
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  enaadd:boolean = false;
  enaupd:boolean = false;
  enadel:boolean = false;

  constructor(
    private dialog:MatDialog,
    private es:EmployeeService,
    private gs:GenderService,
    private ds:DesignationService,
    private fb:FormBuilder,
    private tst:ToastService,
    private rs:RegexService,
    private ets:EmployeetypeService,
    private ess:EmployeestatusService,
    private auths:AuthorizationService,
    private cdr:ChangeDetectorRef
  ) {

    this.employeeSearchForm = this.fb.group({
      sslastname:[null,[Validators.pattern(/^([A-Z][a-z]*[.]?[\s]?)*([A-Z][a-z]*)$/)]],
      ssnumber:[null,[Validators.pattern(/^E[0-9]{3}$/)]],
      ssgender:['default',Validators.required],
      ssdesignation:['default',Validators.required],
    });

    this.employeeForm = this.fb.group({
      "number": new FormControl('',[Validators.required]),
      "firstname": new FormControl('',[Validators.required]),
      "lastname": new FormControl('',[Validators.required]),
      "nic": new FormControl('',[Validators.required]),
      "description": new FormControl('',[Validators.required]),
      "mobile": new FormControl('',[Validators.required]),
      "land": new FormControl('',[Validators.required]),
      "email": new FormControl('',[Validators.required]),
      "dob": new FormControl('',[Validators.required]),
      "doassigned": new FormControl('',[Validators.required]),
      "employeetype": new FormControl(null,[Validators.required]),
      "gender": new FormControl(null,[Validators.required]),
      "designation": new FormControl(null,[Validators.required]),
      "employeestatus": new FormControl(null,[Validators.required]),
      "photo": new FormControl('', [Validators.required]),
    },{updateOn:'change'});
  }

  ngOnInit(): void {
    this.initialize();

  }

  initialize(){

    this.loadTable("");

    this.gs.getAll().subscribe({
      next:data => this.genders = data,
      // error: () => this.handleResult('failed')
    });

    this.ds.getAll().subscribe({
      next:data => this.designations = data,
      //error: () => this.handleResult('failed')
    });

    this.rs.getRegexes('employee').subscribe({
      next:data => {
        this.regexes = data;
        this.createForm();
      },
      error: () => this.regexes = [] || undefined
    });

    this.ess.getAll().subscribe({
      next:data => this.employeestatuses = data,
    });

    this.ets.getAll().subscribe({
      next:data => this.emptypes = data,
    });
  }

  loadTable(query:string){
    this.es.getAll(query).subscribe({
      next:data =>{
        this.employees = data;
        this.dataSource = new MatTableDataSource<Employee>(this.employees);
        this.cdr.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.data = this.dataSource.connect();
      }
    })
  }


  createForm(){
    this.employeeForm.controls['number'].setValidators([Validators.required, Validators.pattern(this.regexes['number']['regex'])]);
    this.employeeForm.controls['firstname'].setValidators([Validators.required, Validators.pattern(this.regexes['firstname']['regex'])]);
    this.employeeForm.controls['lastname'].setValidators([Validators.required, Validators.pattern(this.regexes['lastname']['regex'])]);
    this.employeeForm.controls['gender'].setValidators([Validators.required]);
    this.employeeForm.controls['nic'].setValidators([Validators.required, Validators.pattern(this.regexes['nic']['regex'])]);
    this.employeeForm.controls['dob'].setValidators([Validators.required]);
    this.employeeForm.controls['photo'].setValidators([Validators.required]);
    this.employeeForm.controls['doassigned'].setValidators([Validators.required]);
    this.employeeForm.controls['email'].setValidators([Validators.required, Validators.pattern(this.regexes['email']['regex'])]);
    this.employeeForm.controls['mobile'].setValidators([Validators.required, Validators.pattern(this.regexes['mobile']['regex'])]);
    this.employeeForm.controls['land'].setValidators([Validators.required,Validators.pattern(this.regexes['land']['regex'])]);
    this.employeeForm.controls['designation'].setValidators([Validators.required]);
    this.employeeForm.controls['description'].setValidators([Validators.required,Validators.pattern(this.regexes['description']['regex'])]);
    this.employeeForm.controls['employeetype'].setValidators([Validators.required]);
    this.employeeForm.controls['employeestatus'].setValidators([Validators.required]);

    Object.values(this.employeeForm.controls).forEach( control => { control.markAsTouched(); } );

    for (const controlName in this.employeeForm.controls) {
      const control = this.employeeForm.controls[controlName];
      control.valueChanges.subscribe(value => {

          if (this.oldEmployee != undefined && control.valid) {
            // @ts-ignore
            if (value === this.employee[controlName]) {
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

  selectImage(event: any): void {
    if(event.target.files && event.target.files[0]){
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => this.imageempurl = reader.result;
      reader.readAsDataURL(file);
    }
  }

  urlToImage(url:string){
    return 'data:image/jpeg;base64,' + url;
  }

  clearImage(): void {
    this.imageempurl = 'assets/tabledefault.png';
    this.employeeForm.controls['photo'].setErrors({'required': true});
  }

  fillForm(employee:Employee){
    this.enableButtons(false,true,true);

    this.selectedRow = employee;

    this.employee = employee;
    this.oldEmployee = this.employee;

    if(this.employee.photo){
      this.imageempurl = this.urlToImage(this.employee.photo);
      this.employeeForm.controls['photo'].clearValidators();
    }

    //this.employee.photo = "";


    //this.employeeForm.patchValue(this.employee);

    this.employeeForm.setValue({
      firstname: this.employee.firstname,
      lastname: this.employee.lastname,
      nic: this.employee.nic,
      email: this.employee.email,
      mobile: this.employee.mobile,
      land: this.employee.land,
      doassigned: this.employee.doassigned,
      number: this.employee.number,
      gender: this.employee.gender?.id,
      designation: this.employee.designation?.id,
      employeestatus: this.employee.employeestatus?.id,
      employeetype: this.employee.employeetype?.id,
      dob: this.employee.dob,
      description: this.employee.description,
      photo: "",
    });

    this.employeeForm.markAsPristine();

  }

  getUpdates():string {
    let updates: string = "";
    for (const controlName in this.employeeForm.controls) {
      const control = this.employeeForm.controls[controlName];
      if (control.dirty) {
        updates = updates + "<br>" + controlName.charAt(0).toUpperCase() + controlName.slice(1)+" Changed";
      }
    }
    return updates;
  }

  getErrors(){

    let errors:string = "";

    for(const controlName in this.employeeForm.controls){
      const control = this.employeeForm.controls[controlName];
      if(control.errors){
        if(this.regexes[controlName] != undefined){
          errors = errors + "<br>" + this.regexes[controlName]['message'];
        }else{
          errors = errors + "<br>Invalid " + controlName;
        }
      }
    }
    return errors;
  }

  addEmployee(){
    let errors = this.getErrors();

    if(errors != ""){
      this.dialog.open(WarningDialogComponent,{
        data:{heading:"Errors - Employee Add ",message: "You Have Following Errors <br> " + errors}
      }).afterClosed().subscribe(res => {
        if(!res){
          return;
        }
      });
    }else{
      //this.employee = this.employeeForm.getRawValue();
      const employee:Employee = {
        photo: this.imageempurl.split(',')[1],
        number: this.employeeForm.controls['number'].value,
        email: this.employeeForm.controls['email'].value,
        firstname: this.employeeForm.controls['firstname'].value,
        lastname: this.employeeForm.controls['lastname'].value,
        dob: this.employeeForm.controls['dob'].value,
        land: this.employeeForm.controls['land'].value,
        mobile: this.employeeForm.controls['mobile'].value,
        nic: this.employeeForm.controls['nic'].value,
        description: this.employeeForm.controls['description'].value,
        doassigned: this.employeeForm.controls['doassigned'].value,

        designation: {id: parseInt(this.employeeForm.controls['designation'].value)},
        employeestatus: {id: parseInt(this.employeeForm.controls['employeestatus'].value)},
        gender: {id: parseInt(this.employeeForm.controls['gender'].value)},
        employeetype: {id: parseInt(this.employeeForm.controls['employeetype'].value)},

      }

      //console.log(employee);

      this.currentOperation = "Employee Add " +employee.firstname + " ("+employee.number+ ") ";

      this.dialog.open(ConfirmDialogComponent,{data:this.currentOperation})
        .afterClosed().subscribe(res => {
        if(res) {
          this.es.save(employee).subscribe({
            next:() => {
              this.tst.handleResult('success',"Employee Saved Successfully");
              this.loadTable("");
              this.clearForm();
            },
            error:(err:any) => {
              this.tst.handleResult('failed',err.error.data.message);
              //console.log(err);
            }
          });
        }
      })
    }

  }

  updateEmployee(employee:Employee){

    let errors = this.getErrors();

    if(errors != ""){
      this.dialog.open(WarningDialogComponent,{
        data:{heading:"Errors - Employee Update ",message: "You Have Following Errors <br> " + errors}
      }).afterClosed().subscribe(res => {
        if(!res){
          return;
        }
      });

    }else{

      let updates:string = this.getUpdates();

      if(updates != ""){
        this.dialog.open(WarningDialogComponent,{
          data:{heading:"Updates - Employee Update ",message: "You Have Following Updates <br> " + updates}
        }).afterClosed().subscribe(res => {
          if(!res){
            return;
          }else{

            const employees:Employee = {
              id: employee.id,
              photo: this.imageempurl.split(',')[1],
              number: this.employeeForm.controls['number'].value,
              email: this.employeeForm.controls['email'].value,
              firstname: this.employeeForm.controls['firstname'].value,
              lastname: this.employeeForm.controls['lastname'].value,
              dob: this.employeeForm.controls['dob'].value,
              land: this.employeeForm.controls['land'].value,
              mobile: this.employeeForm.controls['mobile'].value,
              nic: this.employeeForm.controls['nic'].value,
              description: this.employeeForm.controls['description'].value,
              doassigned: this.employeeForm.controls['doassigned'].value,

              designation: {id: parseInt(this.employeeForm.controls['designation'].value)},
              employeestatus: {id: parseInt(this.employeeForm.controls['employeestatus'].value)},
              gender: {id: parseInt(this.employeeForm.controls['gender'].value)},
              employeetype: {id: parseInt(this.employeeForm.controls['employeetype'].value)},

            }
            this.currentOperation = "Employee Update ";

            this.dialog.open(ConfirmDialogComponent,{data:this.currentOperation})
              .afterClosed().subscribe(res => {
              if(res) {
                this.es.update(employees).subscribe({
                  next:() => {
                    this.tst.handleResult('success',"Employee Updated Successfully");
                    this.loadTable("");
                    this.clearForm();
                  },
                  error:(err:any) => {
                    this.tst.handleResult('failed',err.error.data.message);
                    //console.log(err);
                  }
                });
              }
            })

          }
        });

      }else{
        this.dialog.open(WarningDialogComponent,{
          data:{heading:"Updates - Employee Update ",message: "No Fields Updated "}
        }).afterClosed().subscribe(res =>{
          if(res){return;}
        })
      }
    }

  }

  deleteEmployee(employee:Employee){

    const operation = "Delete Employee " + employee.lastname +" ("+ employee.number +") ";
    //console.log(operation);

    this.dialog.open(ConfirmDialogComponent,{data:operation})
      .afterClosed().subscribe((res:boolean) => {
      if(res && employee.id){
        this.es.delete(employee.id).subscribe({
          next: () => {
            this.loadTable("");
            this.tst.handleResult("success","Employee Deleted Successfully");
            this.clearForm();
          },
          error: (err:any) => {
            this.tst.handleResult("failed",err.error.data.message);
          }
        });
      }
    })
  }

  generateRandomNumber(){
    const numbers = this.employees.map(n => parseInt(<string>n.number?.substring(1)));
    const maxno = Math.max(...numbers);
    const nextno = maxno + 1;
    const formattedNextNumber = 'E' + nextno.toString().padStart(5, '0');
    this.employeeForm.controls['number'].setValue(formattedNextNumber);
  }

  clearForm(){

    this.employeeForm.reset();
    this.employeeForm.controls['gender'].setValue(null);
    this.employeeForm.controls['designation'].setValue(null);
    this.employeeForm.controls['employeestatus'].setValue(null);
    this.enableButtons(true,false,false);

    this.clearImage();

  }

  handleSearch(){

    const sslastname  = this.employeeSearchForm.controls['sslastname'].value;
    const ssnumber  = this.employeeSearchForm.controls['ssnumber'].value;
    const ssgender  = this.employeeSearchForm.controls['ssgender'].value;
    const ssdesignation  = this.employeeSearchForm.controls['ssdesignation'].value;

    let query = ""

    if(ssnumber != null && ssnumber.trim() !="") query = query + "&number=" + ssnumber;
    if(sslastname != null && sslastname.trim() !="") query = query + "&lastname=" + sslastname;
    if(ssgender != 'default') query = query + "&genderid=" + parseInt(ssgender);
    if(ssdesignation != 'default') query = query + "&designationid=" + parseInt(ssdesignation);

    if(query != "") query = query.replace(/^./, "?")
    this.loadTable(query);
  }

  clearSearch() {

      const operation = "Clear Search";

      this.dialog.open(ConfirmDialogComponent,{data:operation})
        .afterClosed().subscribe(res => {
        if(!res){
          return;
        }else{
          this.employeeSearchForm.reset();
          this.employeeSearchForm.controls['ssgender'].setValue('default');
          this.employeeSearchForm.controls['ssdesignation'].setValue('default');
          this.loadTable("");
        }
      });
  }
}
