// S5L59 Classes

// S5L60 Creating First Class
abstract class Department {
  // private readonly id: string;
  // private depName: string; // field of a class;
  protected employees: string[] = []; // access modifier;

  static company = "My Company";
  static readonly YEAR = 2024;
  // methods:
  constructor(
    protected readonly id: string, // that is a shorter option for declaring & initializing class fields
    public depName: string, // in this case "public" has to be added;
  ) {
    // this.depName = n;
  }

  abstract describe(this: Department): void;

  addEmployee(empl: string) {
    this.employees.push(empl);
  }

  printEmplInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  }

  static createEmployee(empName: string) {
    return { name: empName };
  }
}

// const devDep = new Department("d1", "Development");

// console.log(devDep);

// // S5L61 Compiling to JS

// // S5L62 Constructor Functions and the "this" keyword

// devDep.describe();

// // const devDepCopy = { describe: devDep.describe, depName: "DUMMY" };
// // devDepCopy.describe();

// // S5L63 Private and Public access modifiers
// devDep.addEmployee("Peter");
// devDep.addEmployee("Igor");
// // devDep.employees.push("Ana"); // not allowed for "private" fields;
// devDep.printEmplInfo();

console.log(Department.company);

// S5L64 Shorthand initialization

// S5L65 "readonly" properties;
// readonly - is TS only feature

// S5L66 Classes Inheritance

class ITDepartment extends Department {
  constructor(
    id: string,
    public admins: string[],
  ) {
    super(id, "IT Department");
    this.admins = [...admins];
  }

  describe(this: ITDepartment): void {
    console.log(`IT Department - ID: ${this.id}`);
  }
}

const itDep = new ITDepartment("d2", ["Peter", "Alex", "Jerry"]);
console.log(itDep);

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  private constructor(
    id: string,
    private reports: string[],
  ) {
    super(id, "Accounting Department");
    this.reports = [...reports];
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    } else {
      this.instance = new AccountingDepartment("d2", []);
      return this.instance;
    }
  }

  get mostRecentReport() {
    if (this.lastReport) return this.lastReport;
    else throw new Error("No last report");
  }

  set mostRecentReport(value: string) {
    if (!value) return;
    this.addReport(value);
  }

  describe(this: AccountingDepartment): void {
    console.log(`Accounting department id - ${this.id}`);
  }

  addEmployee(empl: string): void {
    if (empl === "Max") return;

    this.employees.push(empl); // parent's class "private" properties are not accessible in inherited classes; > switch to "protected" modifier
  }

  addReport(rep: string) {
    this.reports.push(rep);
    this.lastReport = rep;
  }

  printReports() {
    this.reports.forEach(rep => console.log(rep));
  }
}

// const accDep = new AccountingDepartment("d3", []);
const accDep = AccountingDepartment.getInstance();
const accDep2 = AccountingDepartment.getInstance();
console.log(accDep, accDep2);

accDep.mostRecentReport = "report000";

try {
  console.log(`Most recent report: ${accDep.mostRecentReport}`);
} catch (error) {
  console.error(`💥 ${error}`);
}

accDep.addReport("rep3");
accDep.printReports();
console.log(accDep);

// S5L67 Overriding properties, "protected"

// S5L68 Getters & Setters
console.log(`Most recent report: ${accDep.mostRecentReport}`);

// S5L69 Static Props & Methods
const emp1 = Department.createEmployee("peter");
console.log(emp1);
console.log(Department.YEAR);

// S5L70 Abstract Classes

// S5L71 Singletons & Private Constructors
