import { EmployeeRepository } from "./EmployeeRepository.js";
import { generateAccessToken } from "../../utils/jwt.utils.js";
import { MessagesEnum } from "../shared/enums/messagesEnum.js";
import { SystemConstantsEnum } from "../shared/enums/systemConstantsEnum.js";
import { PrismaErrorEnum } from "../shared/enums/prismaErrorEnum.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export class EmployeeService {
    private employeeRepository = new EmployeeRepository();

    async authEmployee(email: string, password: string): Promise<string> {
        const dbEmployee = await this.employeeRepository.getByEmail(email);

        if (!dbEmployee) {
            throw new Error(MessagesEnum.ERROR_INVALID_CREDENTIALS);
        }

        const hashedPassword = dbEmployee.password;
        if (!hashedPassword || typeof hashedPassword !== 'string') {
            throw new Error(MessagesEnum.ERROR_INVALID_CREDENTIALS);
        }

        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        if (!isPasswordValid) {
            throw new Error(MessagesEnum.ERROR_INVALID_CREDENTIALS);
        }

        const employeeId = dbEmployee.id;
        const token = generateAccessToken(employeeId);
        return token;
    }

    async registerEmployee(
        email: string,
        password: string,
        name: string,
        employeeId: string,
    ): Promise<string> {
        // Validação de email
        let dbEmployee = await this.employeeRepository.getByEmail(email);
        if (dbEmployee) {
            throw new Error("Email já cadastrado");
        }

        // Validação de employeeId
        dbEmployee = await this.employeeRepository.getByEmployeeId(employeeId);
        if (dbEmployee) {
            throw new Error("ID de funcionário já cadastrado");
        }

        // Hash da senha
        password = await bcrypt.hash(password, SystemConstantsEnum.BCRYPT_SALT_ROUNDS);

        try {
            const employee = await this.employeeRepository.create(
                email,
                password,
                name,
                employeeId
            );

            const token = generateAccessToken(employee.id);
            return token;
        } catch (err: any) {
            // Erro de 'unique constraint' do prisma
            if (err.code === PrismaErrorEnum.UNIQUE_CONSTRAINT) {
                throw new Error("Email ou ID de funcionário já cadastrado");
            }
            throw new Error("Erro ao criar funcionário");
        }
    }

    async profileData(employeeId: number) {
        const employee = await this.employeeRepository.getById(employeeId);

        if (!employee) {
            throw new Error("Funcionário não encontrado");
        }

        return employee;
    }
}

