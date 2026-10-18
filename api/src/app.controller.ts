import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/roles')
  getRoles():string{
    return "This is roles";
  }

  @Get('/users')
  getUsers():string{
    return "This is users";
  }

  @Get('/categories')
  getCategirues():string{
    return "This is categories";
  }

  @Get('/products')
  getProducts():string{
    return "This is product";
  }
}
