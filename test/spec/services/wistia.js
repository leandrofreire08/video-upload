'use strict';

describe('Service: Wistia', function () {

  // load the service's module
  beforeEach(module('psUploadApp'));

  // instantiate service
  var Wistia;
  beforeEach(inject(function (_Wistia_) {
    Wistia = _Wistia_;
  }));

  it('should do something', function () {
    expect(!!Wistia).toBe(true);
  });

});
