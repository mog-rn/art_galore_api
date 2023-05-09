import { ApiProperty } from "@nestjs/swagger";

export class PaymentSheetEntity {
    @ApiProperty()
    customer: string;

    @ApiProperty()
    ephemeralKey: string;

    @ApiProperty()
    paymentIntent: string;

    @ApiProperty()
    publishableKey: string;

    constructor(customer: string, ephemeralKey: string, paymentIntent: string, publishableKey: string) {
        this.customer = customer;
        this.ephemeralKey = ephemeralKey;
        this.paymentIntent = paymentIntent;
        this.publishableKey = publishableKey;
    }


}
