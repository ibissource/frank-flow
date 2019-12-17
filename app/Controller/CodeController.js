import CodeModel from '../Model/CodeModel.js';
import CodeView from '../View/codeView/CodeView.js';
import ToBeautifulSyntax from '../View/codeView/ToBeautifulSyntax.js';
export default class CodeController {

  constructor(mainController) {
    this.mainController = mainController;
    this.codeModel = new CodeModel();
    this.codeView = new CodeView();
    this.codeView.addListener(this);
    this.toBeautiful = new ToBeautifulSyntax();
    this.notify({
      type: "getData"
    });
    this.notify({
      type: "setEditor"
    });
    this.editor = this.codeView.editor;
    this.initListeners();
  }

  notify(data) {
    switch (data.type) {
      case "getData":
        this.getXsd();
        this.getCode();
        this.getConfigurations();
        break;
      case "setEditor":
        this.codeView.makeEditor();
        break;
    }
  }


  initListeners() {
    let cur = this;
    $('#adapterSelect').on('change', function(e) {
      let adapter = $('#adapterSelect').val();
      cur.editor.getModel().setValue(localStorage.getItem(adapter));
    });

    $('#adapterSelect').on('click', function(e) {
      let adapter = $('#adapterSelect').val();
      localStorage.setItem(adapter, cur.editor.getModel().getValue());
    });

    $('#beautify').click(function() {
      let prettyXML = beautify.xml(cur.editor.getValue(), 4);
      cur.editor.getModel().setValue(prettyXML);
    });

    cur.editor.onMouseDown(function(e) {
      e.target.range.startLineNumber = 1;
      e.target.range.startColumn = 1;
      let textPossition = cur.editor.getModel().getValueInRange(e.target.range);
      let adapters = textPossition.match(/<Adapter[^]*?name=".*?">/g);
      if(adapters != null) {
        let adapterName = adapters[adapters.length - 1].match(/name="[^]*?"/g)[0].match(/"[^]*?"/g)[0].replace(/"/g, '');
        localStorage.setItem("currentAdapter", adapterName);
        cur.mainController.generateFlow();
      }
    })

    this.editor.getModel().onDidChangeContent(function(e) {
      if (!cur.mainController.flowController.flowView.moving && !cur.mainController.flowController.flowView.adding) {
        try {
          $('#canvas').css('display', 'block');
          $('.customErrorMessage').remove();
          cur.mainController.generateFlow();
          // if(editor.getModel().getValue() == "") {
          //   undoDecorations();
          // }
        } catch (error) {
          console.log("error", error);
          cur.mainController.flowController.flowView.modifyFlow("error", error);
        }
      }
    })

    //run the xsd to the xml that is currently in the editor
    $('#runXsd').click(function() {
      let validate = cur.validateConfiguration(),
        lineNumber = 0;
      cur.undoDecorations();
      if (validate.errors !== null) {
        console.log(validate.errors);
        validate.errors.forEach(function(item, index) {
          lineNumber = item.match(/:.*?:/)[0].replace(/:/g, '');
          cur.decorateLine(lineNumber);
        });
      }
    })
  }

  selectPipe(name) {
    this.codeView.selectPipe(name);
  }
  getTypes() {
    return this.codeView.getTypes();
  }
  validateConfiguration() {
    return this.codeView.validateConfigurationView.validateConfiguration();
  }
  decorateLine(lineNumber) {
    this.codeView.validateConfigurationView.decorateLine(lineNumber);
  }
  undoDecorations() {
    this.codeView.validateConfigurationView.undoDecorations();
  }
  changeName(oldWord, newWord) {
    this.codeView.changeName(oldWord, newWord);
  }
  changePossition(name, newX, newY) {
    this.codeView.changePossition(name, newX, newY);
  }
  changeExitPossition(name, newX, newY) {
    this.codeView.changeExitPossition(name, newX, newY);
  }
  changeAddForward(name, path) {
    this.codeView.changeAddForward(name, path);
  }
  deleteForward(name, path) {
    this.codeView.deleteForward(name, path);
  }
  changeAddPipe(name, possitions, className) {
    this.codeView.changeAddPipe(name, possitions, className);
  }
  getPipes() {
    return this.codeView.ibisdocJson;
  }


  getCode() {
    let cur = this;
    fetch('https://cors-anywhere.herokuapp.com/https://ibis4example.ibissource.org/rest/ibisdoc/ibisdoc.json', {
        method: 'GET'
      })
      .then(response => {
        return response.json()
      })
      .then(data => {
        // Work with JSON data here
        cur.codeView.ibisdocJson = data;
        cur.mainController.setPipes(data);
      })
      .catch(err => {
        // Do something for an error here
        console.log(err);
      })
  }

  getXsd() {
    fetch('https://cors-anywhere.herokuapp.com/https://ibis4example.ibissource.org/rest/ibisdoc/ibisdoc.xsd', {
        method: 'GET'
      })
      .then(response => {
        return response.text()
      })
      .then(data => {
        // Work with JSON data here
        localStorage.setItem("ibisdocXsd", data);
        console.log("xsd is loaded!, here");
      })
      .catch(err => {
        console.log("not loaded xsd", err);
        // Do something for an error here
      })
  }

  getConfigurations() {
    let cur = this;
    fetch('https://cors-anywhere.herokuapp.com/https://ibis4example.ibissource.org/iaf/api/configurations', {
        method: 'GET'
      })
      .then(response => {
        return response.text();
      })
      .then(response => {
        let configurations = [],
          dom, obj;
        response.match(/<[cC]onfiguration[^]*?>[^]*?<\/[cC]onfiguration>/g).forEach(function(item, index) {
          configurations.push(item);
          // item.match(/<[aA]dapter[^]*?>[^]*?<\/[aA]dapter>/g).forEach(function(item, index) {
          // });
        })
        return configurations;
      })
      .then(response => {
        response.forEach(function(item, index) {
          if (item.match(/<Configuration/g) == null) {
            response[index] = cur.toBeautiful.toBeautifulSyntax(item);
            localStorage.setItem(index, cur.toBeautiful.toBeautifulSyntax(item));
          } else {
            localStorage.setItem(index, item);
          }

        });
        return response;
      })
      .then(data => {
        // Work with JSON data here
        cur.codeView.addOptions(data);
      })
      .catch(err => {
        console.log('couldnt load configurations', err)
      })
  }
}