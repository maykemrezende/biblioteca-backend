import { Controller, Get, Route } from "tsoa";

@Route("api")
export class HealthCheckController extends Controller{
    @Get("health")
    public async GetHealth() : Promise<number>{
        return 1;
    }
}