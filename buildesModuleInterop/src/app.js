"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.app = void 0;
const koa_1 = __importDefault(require("koa"));
const router_1 = __importDefault(require("@koa/router"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_json_1 = __importDefault(require("koa-json"));
const kcors_1 = __importDefault(require("kcors"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa2_swagger_ui_1 = require("koa2-swagger-ui");
const koa_static_1 = __importDefault(require("koa-static"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const routes_1 = require("../build/routes");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.app = new koa_1.default();
const router = new router_1.default();
exports.app.use((0, koa_bodyparser_1.default)());
exports.app.use((0, koa_json_1.default)());
exports.app.use((0, koa_logger_1.default)());
exports.app.use((0, kcors_1.default)());
// #######
// Registering the auto-generated routes from tsoa
(0, routes_1.RegisterRoutes)(router);
exports.app.use(router.routes()).use(router.allowedMethods());
// #######
const SWAGGER_DIR_TO_SERVE = path_1.default.join(__dirname, '..');
const swaggerDocPath = path_1.default.join(SWAGGER_DIR_TO_SERVE, 'swagger.json');
if (process.env.NODE_ENV !== 'test' && !(0, fs_1.existsSync)(swaggerDocPath)) {
    throw new Error(`Could not locate this file: ${swaggerDocPath}`);
}
exports.app.use((0, koa_static_1.default)(SWAGGER_DIR_TO_SERVE));
const SWAGGER_UI_ROUTE = '/swagger';
const specificHostname = process.env.APP_HOST;
const PORT_THAT_WILL_WORK_WITH_SWAGGER_UI = 3000;
if (process.env.PORT && parseInt(process.env.PORT) !== PORT_THAT_WILL_WORK_WITH_SWAGGER_UI) {
    throw new Error(`The only port that will work with the swagger UI is ${PORT_THAT_WILL_WORK_WITH_SWAGGER_UI}`);
}
exports.port = PORT_THAT_WILL_WORK_WITH_SWAGGER_UI;
exports.app.use((0, koa2_swagger_ui_1.koaSwagger)({
    routePrefix: SWAGGER_UI_ROUTE,
    // oauthOptions: {
    // as defined in https://github.com/swagger-api/swagger-ui/blob/master/docs/usage/oauth2.md
    // clientId: envVars.get('OAUTH_CLIENT_ID'),
    // },
    hideTopbar: true,
    swaggerOptions: {
        url: `http://${specificHostname}:${exports.port}/swagger.json`,
        // oauth2RedirectUrl: oauth2RedirectUrl,
        showRequestHeaders: true,
        jsonEditor: true,
        // tslint:disable-next-line: no-any // TODO: make an open source PR to update  @types/koa2-swagger-ui since this is actually supported via https://github.com/scttcper/koa2-swagger-ui/pull/41/files#
        // requestInterceptor: requestInterceptor as any,
    },
}));
// AppDataSource.initialize().catch(error => console.log(error))
