import { EmployeeQRRepository } from "./EmployeeQRRepository.js";
import { AuthService } from "../auth/AuthService.js";
import { RecycleService } from "../recycle/RecycleService.js";

export class EmployeeQRService {
    private qrRepository = new EmployeeQRRepository();
    private authService = new AuthService();
    private recycleService = new RecycleService();

    generateQRCode(): string {
        // Gerar código único para o QR code
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 9).toUpperCase();
        return `ECOCAP-${timestamp}-${random}`;
    }

    async createQRCode(
        employeeId: number,
        xp: number,
        capibas: number,
        location?: string,
        notes?: string,
        expiresInHours?: number
    ) {
        const code = this.generateQRCode();
        
        let expiresAt: Date | undefined;
        if (expiresInHours) {
            expiresAt = new Date();
            expiresAt.setHours(expiresAt.getHours() + expiresInHours);
        }

        const qrCode = await this.qrRepository.create(
            code,
            employeeId,
            xp,
            capibas,
            location,
            notes,
            expiresAt
        );

        return {
            id: qrCode.id,
            code: qrCode.code,
            qrUrl: this.generateQRUrl(code),
            xp: qrCode.xp,
            capibas: qrCode.capibas,
            location: qrCode.location,
            notes: qrCode.notes,
            expiresAt: qrCode.expiresAt,
            createdAt: qrCode.createdAt,
        };
    }

    generateQRUrl(code: string): string {
        // Gerar QR code com o código direto (mais simples para o scanner processar)
        // O scanner vai procurar por "ECOCAP-" na string
        const qrData = code; // Usar o código direto
        const encodedData = encodeURIComponent(qrData);
        return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedData}&color=67A02C&bgcolor=ffffff&margin=10`;
    }

    async validateAndProcessQRCode(code: string, userId: number) {
        const qrCode = await this.qrRepository.findByCode(code);

        if (!qrCode) {
            throw new Error("QR Code inválido ou não encontrado");
        }

        if (qrCode.used) {
            throw new Error("Este QR Code já foi utilizado");
        }

        if (qrCode.expiresAt && new Date() > qrCode.expiresAt) {
            throw new Error("Este QR Code expirou");
        }

        // Marcar como usado
        await this.qrRepository.markAsUsed(code, userId);

        // Registrar reciclagem
        try {
            await this.recycleService.registerRecycle(userId, new Date());
        } catch (recycleError) {
            // Se já foi registrado hoje, não é um erro crítico
            console.warn('Reciclagem já registrada ou erro ao registrar:', recycleError);
        }

        // Adicionar recompensas ao usuário
        await this.authService.addUserReward(
            userId,
            qrCode.xp,
            qrCode.capibas,
            "recycle_reward",
            {
                description: "Recompensa por reciclagem registrada",
                location: qrCode.location,
                notes: qrCode.notes,
                qrCodeId: qrCode.id,
            }
        );

        return {
            xp: qrCode.xp,
            capibas: qrCode.capibas,
            location: qrCode.location,
        };
    }

    async getEmployeeQRHistory(employeeId: number, limit = 20) {
        return await this.qrRepository.getByEmployee(employeeId, limit);
    }
}

