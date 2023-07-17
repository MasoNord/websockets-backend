export class RequestParser {
    TypeParser(content: string): string  {
        const result = JSON.parse(content).type
        
        return result;
    }

    DataParser(content: string): any {
        const result = JSON.parse(content).data;
        
        return JSON.parse(result);
    }

}                   