export function getElementById(id) {
    const el = document.getElementById(id);
    if (!el) {
        throw new Error(`Element '${id}' is null`);
    }
    return el;
}
//# sourceMappingURL=utils.js.map