export interface IBusinessCardTest {
    f_name: string;
    l_name: string;
    email: string;
    phone_number: string,
    misc_text: string,
    image: string;
}

export interface IBusinessCardTestID extends IBusinessCardTest {
    id: string;
}