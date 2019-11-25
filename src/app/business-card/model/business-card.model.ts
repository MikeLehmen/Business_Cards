export interface IBusinessCard {
    f_name: string;
    l_name: string;
    email: string;
    phone_number: string,
    misc_text: string,
    image: string;
}

export interface IBusinessCardID extends IBusinessCard {
    id: string;
}