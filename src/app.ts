import Koa from "koa";
import Router from '@koa/router';
import Logger from "koa-logger";
import json from "koa-json";
import cors from 'kcors';
import bodyParser from 'koa-bodyparser';
import { KoaSwaggerUiOptions, koaSwagger } from 'koa2-swagger-ui';
type koa2SwaggerUiFunc = (config: Partial<KoaSwaggerUiOptions>) => Koa.Middleware;
import koaStatic from 'koa-static';
import path from 'path';
import { existsSync } from 'fs';
import { RegisterRoutes } from "../build/routes";
import { AppDataSource } from "./data-source"
import dotenv from 'dotenv'
dotenv.config()

export const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(json())
app.use(Logger())
app.use(cors());

// #######
// Registering the auto-generated routes from tsoa
RegisterRoutes(router);
app.use(router.routes()).use(router.allowedMethods());
// #######

const SWAGGER_DIR_TO_SERVE = path.join(__dirname, '..');
const swaggerDocPath = path.join(SWAGGER_DIR_TO_SERVE, 'swagger.json');
if (process.env.NODE_ENV !== 'test' && !existsSync(swaggerDocPath)) {
    throw new Error(`Could not locate this file: ${swaggerDocPath}`);
}
app.use(koaStatic(SWAGGER_DIR_TO_SERVE));

const SWAGGER_UI_ROUTE = '/swagger';

const specificHostname = process.env.APP_HOST;
const PORT_THAT_WILL_WORK_WITH_SWAGGER_UI = 3000;
if (process.env.PORT && parseInt(process.env.PORT) !== PORT_THAT_WILL_WORK_WITH_SWAGGER_UI) {
	throw new Error(`The only port that will work with the swagger UI is ${PORT_THAT_WILL_WORK_WITH_SWAGGER_UI}`);
}
export const port = PORT_THAT_WILL_WORK_WITH_SWAGGER_UI;

app.use(
	koaSwagger({
		routePrefix: SWAGGER_UI_ROUTE, // host at /swagger instead of default /docs
		// oauthOptions: {
			// as defined in https://github.com/swagger-api/swagger-ui/blob/master/docs/usage/oauth2.md
			// clientId: envVars.get('OAUTH_CLIENT_ID'),
		// },
		hideTopbar: true,
		swaggerOptions: {
			url: `http://${specificHostname}:${port}/swagger.json`,
			// oauth2RedirectUrl: oauth2RedirectUrl,
			showRequestHeaders: true,
			jsonEditor: true,
			// tslint:disable-next-line: no-any // TODO: make an open source PR to update  @types/koa2-swagger-ui since this is actually supported via https://github.com/scttcper/koa2-swagger-ui/pull/41/files#
			// requestInterceptor: requestInterceptor as any,
		},
	}),
);

AppDataSource.initialize().catch(error => console.log(error))