import Uploader from '../scripts/Upload';
import MockEvent from './helpers/mock.events';
import MockFile from './helpers/mock.file';

fdescribe('A class object that handles file uploads', function () {


  describe('A method for handling file uploads', function() {
    // NOTE use spies here

    it('should distinguish between different events when called', function() {
      const mockDrop = new MockEvent('drop');
      const mockChange = new MockEvent('change');
      const mockFocus = new MockEvent('focus');
      const spyChange = spyOnProperty(mockChange, 'type','get');
      const spyDrop = spyOnProperty(mockDrop, 'type', 'get');


      Uploader.handleFile(mockDrop);
      Uploader.handleFile(mockChange);
      const resultNull = Uploader.handleFile(mockFocus);

      expect(spyDrop).toHaveBeenCalled();
      expect(spyChange).toHaveBeenCalled();
      expect(resultNull).toBe(null);
    })

    it('should return a file with the appropriate method when called with a drop event', function() {
      const mockDrop = new MockEvent('drop');

      const spyDrop = spyOnProperty(mockDrop, 'dataTransfer', 'get').and.callThrough();
      const result = Uploader.handleFile(mockDrop);

      expect(spyDrop).toHaveBeenCalled();
      expect(result).toBe('Returning files from drop event');
    })

    it('should return a file with the appropriate method when called with a change event', function() {
      const mockChange = new MockEvent('change');

      const spyChange = spyOnProperty(mockChange, 'target', 'get').and.callThrough();
      const result = Uploader.handleFile(mockChange);

      expect(spyChange).toHaveBeenCalled();
      expect(result).toBe('Returning files from change event');
    })
  })

  describe('A method for checking the uploaded file(s)', function() {

    it('should try checking the type of input event when called with an event', function() {
      const mockFile = new MockFile('mock.png', 555, 'image/png');
      const mockChange = new MockEvent('change', true, mockFile);

      const spyMethod = spyOn(Uploader, 'handleFile').and.callThrough();
      Uploader.fileCheck(mockChange);

      expect(spyMethod).toHaveBeenCalled();
    })

    xit('should throw when called with an invalid File object', function() {



      expect().nothing();
    })

    it('should check the file type when called with an event', function() {
      const mockFile = new MockFile('mock.png', 555, 'image/png');
      const mockChange = new MockEvent('change', true, mockFile);

      const spyStringCheck = spyOnProperty(mockFile, 'type', 'get').and.callThrough();
      Uploader.fileCheck(mockChange);

      expect(spyStringCheck).toHaveBeenCalled();
    })

    it('should return an array with a string and a file inside when called with an event with an image file', function() {
      const mockFile = new MockFile('mock.png', 555, 'image/png');
      const mockChange = new MockEvent('change', true, mockFile);
      const result = Uploader.fileCheck(mockChange);
      const string = result[0];
      const file = result[1];

      expect(typeof string).toBe('string');
      expect(file instanceof MockFile).toBe(true);
    })
  })

  describe('A method for parsing image files', function() {

    xit('does a thing', function() {
      // dab
    })
  })

})
