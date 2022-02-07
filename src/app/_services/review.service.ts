import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

import { Observable } from 'rxjs';

export interface FilesUploadMetadata {
    uploadProgress$: Observable<number>;
    downloadUrl$: Observable<string>;
}

@Injectable({
    providedIn: 'root'
})

export class CustomerReviewService {
    private dbReview = '/customer-review';
    reviewRef: AngularFireObject<any>;

    constructor(
        private db: AngularFireDatabase,
    ) { }

    public async saveReviewData(query: any): Promise<void> {
        await this.db.list(this.dbReview).push(query);
    }

    getReviewData(): AngularFireList<any> {
        return this.db.list(this.dbReview);
    }

    public deleteReviewData(key: string) {
        return this.db.list(this.dbReview).remove(key);
    }

}