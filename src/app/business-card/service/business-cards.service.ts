import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IBusinessCard, IBusinessCardID } from '../model/business-card.model';
import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class BusinessCardService {
    private itemsCollection: AngularFirestoreCollection<IBusinessCard>;
    private itemsMeta: Observable<IBusinessCardID[]>;

    private authObserver: any;

    constructor(private afs : AngularFirestore, afAuth: AngularFireAuth) {

        this.authObserver = afAuth.auth.onAuthStateChanged((user) => {
            if (user) {
                this.itemsCollection = this.afs.collection(user.uid);
                this.itemsMeta = this.itemsCollection.snapshotChanges().pipe(
                    map( (actions) => actions.map( item  => {
                        const data = item.payload.doc.data() as IBusinessCard;
                        const id = item.payload.doc.id;
                        return { id, ...data };
                    }))
                );
            }
            else {
                // clear observables
                this.itemsCollection = null;
                this.itemsMeta = null;
            }
        })

    }

    getItemRef(): Observable<IBusinessCardID[]> {
        return this.itemsMeta;
    }

    create(card: IBusinessCard) : Promise<firebase.firestore.DocumentReference> {
        return this.itemsCollection.add(card);
    }

    delete(card: IBusinessCardID) : void {
        this.itemsCollection.doc(card.id).delete();
    }

    update(card: IBusinessCardID) : void {
        const data : IBusinessCard = {
            f_name: card.f_name,
            l_name: card.l_name,
            email: card.email,
            phone_number: card.phone_number,
            misc_text: card.misc_text,
            image: card.image
        };

        this.itemsCollection.doc(card.id).update(data);
    }

    search(searchBy: string, searchTerm: string) {
        var result = this.itemsCollection.ref.where(searchBy, '==', searchTerm);
        return result;
    }
}