# ng-ckeditor5-custom
Demo sample of ckeditor + angular and also adding third party plugins


## First download build sources from online build

https://ckeditor.com/ckeditor-5/online-builder/

## then go to downloaded project and try to install third party needed npm libs 
### in my case it was 

npm i @codecogs/eqneditor-ckeditor5

### then do some config
```
import Eqneditor5 from '@codecogs/eqneditor-ckeditor5/src/eqneditor5';
import Image from '@ckeditor/ckeditor5-image/src/image';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';

ClassicEditor.create( document.querySelector( '#editor' )) {
	plugins: [
		Eqneditor5,
        Image,
		MediaEmbed
        ...
    ],
    toolbar: [
		'eqneditor5Button',
        ...
    ]
    ...
}
```
### Also do not forget add typings config
```
in tsconfig.app.json or tsconfig.json
include: [
  'path-to-file.d.ts'
]
```
### then you need to build your editor to take effect

```
npm run build
```
### after that just copy your sources to the folder node_modules of your project

### don't forget to add ``` eqneditor5Button ``` to the toolbar of your editor

