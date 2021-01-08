//inheritance, getters, setters, static methods, abstract classes, all that

type Employee = { name: string };

abstract class BaseDepartment {
  // private readonly id: string;
  // private name: string;
  protected employees: Employee[] = [];

  constructor(protected readonly id: string, protected readonly name: string) {}

  static createEmployee(name: string) {
    return { name };
  }

  describe(this: BaseDepartment) {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: Employee) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(`Department size: ${this.employees.length}`);
    console.log(`Staff lineup: ${this.employees.map(e => e.name)}`);
  }
}

class ITDepartment extends BaseDepartment {
  constructor(id: string) {
    super(id, "IT");
  }
}

class AccountingDepartment extends BaseDepartment {
  private reports: string[] = [];
  private lastReport: string | undefined;

  constructor(id: string) {
    super(id, "IT");
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }

  get mostRecentReport() {
    if (!this.lastReport) throw new Error("no report found");
    return this.lastReport;
  }

  set mostRecentReport(report: string) {
    // makes it impossible to pass in an empty string
    if (!report) {
      throw new Error(`Please pass in a valid value`);
    }
    this.addReport(report);
  }
}

// demo zone
const itDept = new ITDepartment("d2");
itDept.addEmployee({ name: "Mark" });
itDept.addEmployee({ name: "Bostaph" });
itDept.printEmployeeInformation();

const newEmployee = BaseDepartment.createEmployee("Jimmy Tudesky");
itDept.addEmployee(newEmployee);

const accountingDept = new AccountingDepartment("d3");
accountingDept.addReport("oopsies all around");
accountingDept.addReport("armaggeddon impending");
accountingDept.mostRecentReport = "ice cream is here";
accountingDept.printReports();
console.log(accountingDept.mostRecentReport);

// protected
accountingDept.addEmployee({ name: "Jeremy Colson" });
accountingDept.addEmployee({ name: "Kevin McClooskey" });

accountingDept.printEmployeeInformation();
