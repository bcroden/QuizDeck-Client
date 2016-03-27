describe('example', function () {
	var wakeupService;

	beforeEach(function () {
		module('app', function ($provide) {
			$provide.value('wakeupService', {
				init: jasmine.createSpy()
			});
		});

		inject(function (_wakeupService_) {
			$wakeupService = _wakeupService_;
		});
	});

	it('should start logging service', function() {
	    // expect($wakeupService.init).toHaveBeenCalled();
    });
});
