/**
 * @license Copyright (c) 2014-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { DecoupledEditor } from '@ckeditor/ckeditor5-editor-decoupled';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
declare class Editor extends DecoupledEditor {
    static builtinPlugins: any[];
    static defaultConfig: EditorConfig;
}
export default Editor;
