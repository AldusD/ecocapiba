export const routeRegistry = [];
export function Route(prefix) {
    return function (target) {
        const instance = new target();
        if (!instance.router) {
            throw new Error(`Class ${target.name} must define a 'router' property`);
        }
        routeRegistry.push({
            prefix,
            router: instance.router,
        });
    };
}
//# sourceMappingURL=routeDecorator.js.map