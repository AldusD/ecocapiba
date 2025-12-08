import crypto from 'crypto';
export function generateInvitationCode(length = 8) {
    return crypto
        .randomBytes(length)
        .toString('base64')
        .replace(/[^a-zA-Z0-9]/g, '')
        .substring(0, length)
        .toUpperCase();
}
//# sourceMappingURL=invitationCode.utils.js.map