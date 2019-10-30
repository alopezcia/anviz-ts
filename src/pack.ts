export class Pack {

    public static packInteger( num: number ): Uint8Array {
        if( num > 0xffffffff ){
            throw new Error(`The number ${num} exceeds the buffer capacity`);                
        }
        const result = new Uint8Array(4);    //  4 - 32Bits
// console.log('packInteger - num ', num);
        let hexStr = num.toString(16);
        if( (hexStr.length % 2) === 1 )
            hexStr = '0'+ hexStr;
// console.log('packInteger - hexStr ', hexStr);
        const buffer = Buffer.from(hexStr, 'hex');
// console.log('packInteger - buffer ', buffer);
        const u = Uint8Array.from(buffer);
// console.log('packInteger - u ', u);

        switch( u.length ){
            case 1:
                result[0]=0;
                result[1]=0;
                result[2]=0;
                result[3]=u[0];
                break;
            case 2:
                result[0]=0;
                result[1]=0;
                result[2]=u[0];
                result[3]=u[1];
                break;
            case 3:
                result[0]=0;
                result[1]=u[0];
                result[2]=u[1];
                result[3]=u[2];
                break;
            case 4:
                result[0]=u[0];
                result[1]=u[1];
                result[2]=u[2];
                result[3]=u[3];
                break;
            default:
                throw new Error(`The number ${num} exceeds the buffer capacity`);                
        }
// console.log('packInteger - result ', result);
        return result;
    }
    

    public static packShort( num: number ): Uint8Array {
        if( num > 0xffff ){
            throw new Error(`The number ${num} exceeds the buffer capacity`);                
        }
// console.log('packShort - num ', num);
        const result = new Uint8Array(2);    //  4 - 32Bits
        let hexStr = num.toString(16);
        if( (hexStr.length % 2) === 1 )
            hexStr = '0'+ hexStr;
// console.log('packShort - hexStr ', hexStr);
        const buffer = Buffer.from(hexStr, 'hex');
// console.log('packShort - buffer ', buffer);
        const u = Uint8Array.from(buffer);
// console.log('packShort - u ', u);
        switch( u.length ){
            case 1:
                result[0]=0;
                result[1]=u[0];
                break;
            case 2:
                result[0]=u[0];
                result[1]=u[1];
                break;
            default:
                throw new Error(`The number ${num} exceeds the buffer capacity`);                
        }
// console.log('packShort - result ', result);
        return result;
    }



}