
export class BaseResponse {
    success: boolean;
    message: string;
    data: any; 

    constructor(success: boolean, message: string, data: any) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    static success(data: any, message: string = 'Operación exitosa') {
        return new BaseResponse(true, message, data);
    }

    static error(message: string) {
        return new BaseResponse(false, message, null); 
    }
}