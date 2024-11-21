"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unplugin_swc_1 = require("unplugin-swc");
const config_1 = require("vitest/config");
exports.default = (0, config_1.defineConfig)({
    test: {
        include: ['**/*.e2e-spec.ts'],
        globals: true,
        alias: {
            '@src': './src',
            '@test': './test'
        },
        root: './'
    },
    resolve: {
        alias: {
            '@src': './src',
            '@test': './test'
        }
    },
    plugins: [unplugin_swc_1.default.vite()]
});
//# sourceMappingURL=vitest.e2e.config.js.map