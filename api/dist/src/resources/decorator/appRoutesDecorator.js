import { routeRegistry } from './routeDecorator.js';
export function AppRoutes(target) {
    const original = target;
    const decorated = class extends original {
        constructor(...args) {
            super(...args);
            const app = this.app;
            for (const { prefix, router } of routeRegistry) {
                app.use(prefix, router);
                console.log(`✅ Mounted routes for: ${prefix}`);
            }
        }
    };
    return decorated;
}
//# sourceMappingURL=appRoutesDecorator.js.map