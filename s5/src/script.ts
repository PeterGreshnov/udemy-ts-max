// S5L59 Classes

// S5L60 Creating First Class
class Department {
  // private id: string;
  // private depName: string; // field of a class;
  private employees: string[] = []; // access modifier;

  static company = "My Company";

  // methods:
  constructor(
    private id: string, // that is a shorter option for declaring & initializing class fields
    public depName: string, // in this case "public" has to be added;
  ) {
    // this.depName = n;
  }

  describe(this: Department) {
    // this is a "safety" parameter
    console.log(`This is a ${this.depName} deparment (${this.id})`);
  }

  addEmployee(empl: string) {
    this.employees.push(empl);
  }

  printEmplInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const devDep = new Department("d1", "Development");

console.log(devDep);

// S5L61 Compiling to JS

// S5L62 Constructor Functions and the "this" keyword

devDep.describe();

// const devDepCopy = { describe: devDep.describe, depName: "DUMMY" };
// devDepCopy.describe();

// S5L63 Private and Public access modifiers
devDep.addEmployee("Peter");
devDep.addEmployee("Igor");
// devDep.employees.push("Ana"); // not allowed for "private" fields;
devDep.printEmplInfo();

console.log(Department.company);

// S5L64 Shorthand initialization
