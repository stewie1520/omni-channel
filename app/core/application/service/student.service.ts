import { inject, injectable } from "inversify";
import type { StudentDto } from "../dtos/student.dto";
import { StudentRepository } from "../store/student.repository";

@injectable()
export class StudentService {
  constructor(
    @inject(StudentRepository)
    private readonly studentRepository: StudentRepository
  ) {}

  async findById(id: string): Promise<StudentDto | null> {
    const student = await this.studentRepository.findById(id);
    if (student === null) return student;

    return {
      id: student.id.toString(),
      account: {
        id: student.account.id.toString(),
        email: student.account.email,
      },
      firstName: student.firstName,
      lastName: student.lastName,
      avatarUrl: student.avatarUrl,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    };
  }
}
