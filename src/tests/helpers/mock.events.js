class MockEvent {
  constructor(eventType = 'change') {
    const whatType = typeof eventType;
    if (typeof whatType !== 'string') {
      throw new Error(`Expecting eventType to be a string not a ${whatType}`);
    }
    // TODO mock the files object
    this.eventType = eventType;
    this.file = `Returning files from ${this.eventType} event`;
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
    return {
      files: this.file,
    }
  }

  get target() {
    return {
      files: this.file,
    }
  }
}


export default MockEvent;