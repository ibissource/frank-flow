//import * as xmllint from 'xmllint';

export default class ValidateConfigurationView {

  constructor(editor, xsdModel) {
    this.editor = editor
    this.xsdModel = xsdModel;
  }
  //validate the configuration.
  validateConfiguration() {
    let cur = this;
    let validate = xmllint.validateXML({
      xml: cur.editor.getValue().replace(/\sx=".*?"/g, '').replace(/\sy=".*?"/g, ''),
      schema: cur.xsdModel.xsd,
      TOTAL_MEMORY: 16777217
    });
    return validate;
  }

  decorateLine(lineNumber) {
    this.decorations = this.editor.deltaDecorations([], [{
      range: new monaco.Range(lineNumber, 1, lineNumber, 1),
      options: {
        glyphMarginClassName: 'myGlyphMarginClass'
      }
    }]);
  }

  //undo all decorations.
  undoDecorations() {
    this.decorations = this.editor.deltaDecorations(this.editor.getModel().getAllDecorations(), [{
      range: new monaco.Range(1, 1, 1, 1),
      options: {}
    }]);
    this.editor.getModel().setValue(this.editor.getModel().getValue());
  }
}