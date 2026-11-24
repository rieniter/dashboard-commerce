import {BadRequestException, PipeTransform, Injectable} from '@nestjs/common'


const UUID_V7_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

@Injectable()
export class ParseUUIDv7Pipe implements PipeTransform<string, string>{
    transform(value: string):string {
        if(!UUID_V7_REGEX.test(value)){
            throw new BadRequestException('Invalid ID');
        }
        return value.toLocaleLowerCase();
    }
}