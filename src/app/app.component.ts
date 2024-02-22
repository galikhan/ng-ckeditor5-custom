import { Component, OnInit } from '@angular/core';
import DecoupledEditor from '../ckeditor-custom-build/build/ckeditor';
import { DomSanitizer } from '@angular/platform-browser';
import { EditorConfig } from 'ckeditor5/src/core';
import { MyFileAdapter } from './file-adapter';
import { ApiService } from './api.service';
// import Math from '@isaul32/ckeditor5-math/src/math';
// import AutoformatMath from '@isaul32/ckeditor5-math/src/autoformatmath';
import Eqneditor5 from '@codecogs/eqneditor-ckeditor5/src/eqneditor5';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  uploadUrl = 'http://localhost:8080/api/v1/file';

  title = 'ng-ckeditor5';
  public Editor = DecoupledEditor;
  public model = {
    editorData: '<p>Hello, world!</p>',
  };
  data: any = '';
  public config: EditorConfig = {
    toolbar: [
      'eqneditor5Button',
      'math',
      'bold',
      'htmlEmbed', 
      'italic', 'underline', 'strikethrough', 'code','subscript', 
      'superscript', 'insertImage', 'imageUpload', 'heading', '|', 
      'bold', 'italic', 'imageUpload', 'mediaEmbed', 'insertTable', 
      'tableOfContents',
      
    ],
    image: {
      resizeUnit: 'px',

      // resizeUnit: p
      toolbar: [
        'resizeImage', 
        'imageTextAlternative', 
        'toggleImageCaption', '|',
        'imageStyle:inline', 
        'imageStyle:wrapText', 
        'imageStyle:breakText', '|',
        '|', 'ckboxImageEdit'
      ],
      upload: { types: ['png', 'jpeg'] },
      // resizeOptions: [
      //   {
      //     name: 'resizeImage:original',
      //     label: 'Original',
      //     value: null
      //   },
      //   {
      //     name: 'resizeImage:50',
      //     label: '50%',
      //     value: '50'
      //   },
      //   {
      //     name: 'resizeImage:75',
      //     label: '75%',
      //     value: '75'
      //   }
      // ],

    },
    // plugins: [ Eqneditor5 ],
    
    mediaEmbed: { previewsInData: true },
    // simpleUpload: {
    //   uploadUrl: this.uploadUrl,
    //   withCredentials: true,
    // },
  }


  constructor(private sanitizer: DomSanitizer, private api: ApiService) {
    // this.config.
  }

  ngOnInit(): void {

    const ckeditor_data = localStorage.getItem('ckeditor_data');
    if (ckeditor_data) {
      this.data = this.sanitizer.bypassSecurityTrustHtml(ckeditor_data);
      // const data = this.sanitizer.bypassSecurityTrustHtml(ckeditor_data);
      this.model.editorData = ckeditor_data;
    }
    // this.Editor
    // .forEach(i => {
    //   console.log(i.name);
    // })
  }

  save(): void {
    localStorage.setItem('ckeditor_data', this.model.editorData);
    console.log('ckeditor_data', this.model.editorData)
  }

  onReady(editor: DecoupledEditor): void {
    console.log('names', Array.from(editor.ui.componentFactory.names()));

    // editor.plugins.init()
    const element = editor.ui.getEditableElement()!;
    const parent = element.parentElement!;
    parent.insertBefore(
      editor.ui.view.toolbar.element!,
      element
    );
    editor.plugins.get('FileRepository').createUploadAdapter = (loaded) => {
      return new MyFileAdapter(loaded);
    }
  }
}
