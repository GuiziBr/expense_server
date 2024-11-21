"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unplugin_swc_1 = require("unplugin-swc");
const config_1 = require("vitest/config");
const path_1 = require("path");
exports.default = (0, config_1.defineConfig)({
    test: {
        globals: true,
        root: './',
        environment: 'node',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html']
        }
    },
    resolve: { alias: { '@': (0, path_1.resolve)(__dirname, './src') } },
    plugins: [
        unplugin_swc_1.default.vite({ module: { type: 'es6' } })
    ]
});
//# sourceMappingURL=vitest.config.js.map