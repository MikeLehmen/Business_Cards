// class not used, interact with firestore data through interface
export class BusinessCardTest  {
    firstName: string;
    lastName: string;
    email: string;

    constructor(obj: any) {
        console.log(obj);

        this.firstName  =   obj.f_name  || "n/a";
        this.lastName   =   obj.l_name  || "n/a";
        this.email      =   obj.email   || "n/a";
    }

    dump(): void {
        console.log(this.firstName + " " + this.lastName);
        console.log(this.email);
    }
}

export interface IBusinessCardTest {
    f_name: string;
    l_name: string;
    email: string;
    image: string;
}