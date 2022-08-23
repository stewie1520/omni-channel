export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  account: {
    id: string;
    email: string;
  };
}

export class ComputedStudent {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  account: {
    id: string;
    email: string;
  };

  constructor(student: Student) {
    this.id = student.id;
    this.firstName = student.firstName;
    this.lastName = student.lastName;
    this.createdAt = student.createdAt;
    this.updatedAt = student.updatedAt;
    this.account = student.account;
  }

  get fullName(): string {
    return [this.firstName, this.lastName].map((name) => name.trim()).join(" ");
  }
}
