import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

import { from, Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { HomeSlider } from '../_models/home_slider';

export interface FilesUploadMetadata {
    uploadProgress$: Observable<number>;
    downloadUrl$: Observable<string>;
}

@Injectable({
    providedIn: 'root'
})

export class HomeSliderService {
    private basePath = '/slider';
    private dbhomeSlider = '/home-slider';

    constructor(
        private db: AngularFireDatabase,
        private storage: AngularFireStorage
    ) {
    }

    pushFileToStorage(fileUpload: HomeSlider): Observable<number | undefined> {
        const { name } = fileUpload.file;
        const filePath = `${this.basePath}/${name}`;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, fileUpload.file);

        uploadTask.snapshotChanges().pipe(
            finalize(() => {
                storageRef.getDownloadURL().subscribe(async downloadURL => {
                    fileUpload.url = await downloadURL;
                    fileUpload.name = `${fileUpload.file.name}`;
                    this.saveFileData(fileUpload);
                });
            })
        ).subscribe();

        return uploadTask.percentageChanges();
    }

    private async saveFileData(fileUpload: HomeSlider): Promise<void> {
        await this.db.list(this.dbhomeSlider).push(fileUpload);
    }

    getFiles(): AngularFireList<HomeSlider> {
        return this.db.list(this.dbhomeSlider);
    }

    deleteFile(fileUpload: HomeSlider): void {
        this.deleteFileDatabase(fileUpload.key)
            .then(() => {
                this.deleteFileStorage(fileUpload.name);
            })
            .catch(error => console.log(error));
    }

    private deleteFileDatabase(key: string): Promise<void> {
        return this.db.list(this.dbhomeSlider).remove(key);
    }

    private deleteFileStorage(name: string): void {
        const storageRef = this.storage.ref(this.basePath);
        storageRef.child(name).delete();
    }
}