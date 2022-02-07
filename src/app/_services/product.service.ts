import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { OtherProduct } from '../_models/other_product';

export interface FilesUploadMetadata {
    uploadProgress$: Observable<number>;
    downloadUrl$: Observable<string>;
}

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private dbSpecialProduct = '/special-product';
    private dbOtherProduct = '/other-product';
    private basePath = '/other-product';

    ProductRef: AngularFireObject<any>;

    constructor(
        private db: AngularFireDatabase,
        private storage: AngularFireStorage
    ) { }

    public async saveSpecialProductData(query: any): Promise<void> {
        await this.db.list(this.dbSpecialProduct).push(query);
    }

    getSpecialProductData(): AngularFireList<any> {
        return this.db.list(this.dbSpecialProduct);
    }

    deleteSpecialProductData(key: string) {
        return this.db.list(this.dbSpecialProduct).remove(key);
    }

    pushFileToStorage(fileUpload: OtherProduct): Observable<number | undefined> {
        const { name } = fileUpload.file;
        const filePath = `${this.basePath}/${name}`;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, fileUpload.file);

        uploadTask.snapshotChanges().pipe(
            finalize(() => {
                storageRef.getDownloadURL().subscribe(async downloadURL => {
                    fileUpload.url = await downloadURL;
                    fileUpload.name = `${fileUpload.file.name}`;
                    this.saveOtherProductData(fileUpload);
                });
            })
        ).subscribe();

        return uploadTask.percentageChanges();
    }

    public async saveOtherProductData(query: any): Promise<void> {
        await this.db.list(this.dbOtherProduct).push(query);
    }

    getOtherProductData(): AngularFireList<any> {
        return this.db.list(this.dbOtherProduct);
    }

    deleteOtherProductData(fileUpload: OtherProduct): void {
        this.deleteFileDatabase(fileUpload.key)
            .then(() => {
                this.deleteFileStorage(fileUpload.name);
            })
            .catch(error => console.log(error));
    }

    private deleteFileDatabase(key: string): Promise<void> {
        return this.db.list(this.dbOtherProduct).remove(key);
    }

    private deleteFileStorage(name: string): void {
        const storageRef = this.storage.ref(this.basePath);
        storageRef.child(name).delete();
    }
}