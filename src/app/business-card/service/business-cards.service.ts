import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IBusinessCardTest, IBusinessCardTestID } from '../model/business-card.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BusinessCardService {
    private itemsCollection: AngularFirestoreCollection<IBusinessCardTest>;
    
    private itemsMeta: Observable<IBusinessCardTestID[]>;

    private items: Observable<IBusinessCardTest[]>

    constructor(private afs : AngularFirestore) {
        this.itemsCollection = this.afs.collection('cards-proto');
        this.items = this.itemsCollection.valueChanges();

        this.itemsMeta = this.itemsCollection.snapshotChanges().pipe(
            map( (actions) => actions.map( item  => {
                const data = item.payload.doc.data() as IBusinessCardTest;
                const id = item.payload.doc.id;
                return { id, ...data };
            }))
        );

    }

    getItemRef(): Observable<IBusinessCardTestID[]> {
        return this.itemsMeta;
    }

    delete(card: IBusinessCardTestID) : void {
        this.itemsCollection.doc(card.id).delete();
    }

    update(card: IBusinessCardTestID) : void {
        const data : IBusinessCardTest = {
            f_name: card.f_name,
            l_name: card.l_name,
            email: card.email,
            image: card.image
        };

        this.itemsCollection.doc(card.id).update(data);
    }
}