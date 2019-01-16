// TODO Make the MockFile object an extension of the File object

class MockFile {
  constructor(name, size, fileType) {
    if (typeof name !== 'string') throw new Error(`Expecting name to be a string not ${typeof name}`);
    if (typeof size !== 'number') throw new Error(`Expecting size to be a number not ${typeof number}`);

    this.name = name;
    this.size = size;
    this.fileType = fileType;
  }
  get type() {
    return this.fileType;
  }
}

export default MockFile;