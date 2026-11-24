import {BadRequestException} from '@nestjs/common'
import {ParseUUIDv7Pipe} from './parse-uuidv7.pipe.js'

describe('Parse UUIDv7 Pipe', () => {
    let pipe:ParseUUIDv7Pipe;

    beforeEach(()=> {
        pipe = new ParseUUIDv7Pipe();
    });

    describe('Valid UUIDv7 string', () =>{
        it('Accept lowerCase UUIDv7 and return it', () => {
            const validUUIDv7 = '01234f1b-4c2a-7b8e-9a10-123456789abc';

            expect(pipe.transform(validUUIDv7)).toBe(validUUIDv7);
        });

        it('Accept upperCase UUIDv7 and return it', () =>{
            const inputUUIDV7 = '01234F1B-4B2B-7B8E-9A10-123456789ABC';
            const validUUIDv7 = '01234f1b-4b2b-7b8e-9a10-123456789abc';

            expect(pipe.transform(inputUUIDV7)).toBe(validUUIDv7);
        });
    });
});