import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ApiService } from "./api.service";
import { Observable } from 'rxjs';
import { environment } from "../environments/environment";


export class MyFileAdapter {

    private loader: any;
    xhr!: XMLHttpRequest;

    constructor(loader: any) {
        this.loader = loader;
    }


    // Starts the upload process.
    upload() {

        return this.loader.file
                    .then( (file: any) => new Promise( ( resolve, reject ) => {
                        this._initRequest();
                        this._initListeners( resolve, reject, file );
                        this._sendRequest(file);
                    } ) );
    }

    _initRequest() {

        const xhr = this.xhr = new XMLHttpRequest();
        xhr.open( 'POST', environment.apiUrl + '/file', true );
        xhr.responseType = 'json';

    }

    _initListeners( resolve: any, reject: any, file: any ) {
        
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = `Couldn't upload file: ${ file.name }.`;

        xhr.addEventListener( 'error', () => reject( genericErrorText ) );
        xhr.addEventListener( 'abort', () => reject() );
        xhr.addEventListener( 'load', () => {
            const response = xhr.response;
            if (!response || response.error) {
                return reject( response && response.error ? response.error.message : genericErrorText );
            }

            resolve( {
                default: response.url
            });
        });

        if ( xhr.upload ) {
            xhr.upload.addEventListener( 'progress', (evt: any) => {
                if ( evt.lengthComputable ) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            } );
        }
    }

    _sendRequest( file: any ) {
        const data = new FormData();
        data.append('file', file );
        data.append('container', '1')
        this.xhr.send( data );
    }
}