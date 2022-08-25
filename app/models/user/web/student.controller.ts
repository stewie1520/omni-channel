import { inject, injectable } from "inversify";
import type { StudentDto } from "~/core/application/dtos/student.dto";
import { StudentService } from "~/core/application/service/student.service";
import { WebController } from "~/libs/web-controller/web-controller";
import { requireAccountId } from "~/session.server";

@injectable()
export class StudentController extends WebController {
  constructor(@inject(StudentService) private studentService: StudentService) {
    super();
  }

  async getStudentByAccountId(request: Request): Promise<StudentDto | null> {
    const accountId = await requireAccountId(request);
    return this.studentService.findByAccountId(accountId);
  }
}
