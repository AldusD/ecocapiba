export declare class AuthService {
    private authRepository;
    authUser(email: string, password: string): Promise<string>;
    registerUser(email: string, password: string, cpf: string, name: string, invitationCode: string): Promise<string>;
}
//# sourceMappingURL=AuthService.d.ts.map