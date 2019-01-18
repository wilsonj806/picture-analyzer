import MockFile from './mock.file';

class MockEvent {
  constructor(eventType = 'change', toReturnFiles = false, file = '') {
    const whatType = typeof eventType;
    if (typeof whatType !== 'string') {
      throw new Error(`Expecting eventType to be a string not a ${whatType}`);
    }
    // TODO mock the files object
    this.toReturnFiles = toReturnFiles;
    this.eventType = eventType;
    this.stubbedFile = `Returning files from ${this.eventType} event`;
    this.file = file;
  }

  stopPropagation() {
    return 'stopping Propagation';
  }

  preventDefault() {
    return 'preventing Default';
  }

  get type() {
    return this.eventType;
  }

  get dataTransfer() {
    if (this.toReturnFiles === true) {
      return {
        files: [...this.file],
      }
    }
    return {
      files: this.stubbedFile,
    }
  }

  get target() {
    if (this.toReturnFiles === true) {
      return {
        files: [this.file],
      }
    }
    return {
      files: this.stubbedFile,
    }
  }
}


export default MockEvent;