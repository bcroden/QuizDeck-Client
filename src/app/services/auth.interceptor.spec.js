'use strict';

ngDescribe({
    name: 'Auth Interceptor',
    module: 'app',
    tests: function(authInterceptor, $window) {
        var authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
        var header = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
        
        beforeEach(function() {
            $window.sessionStorage.authToken = authToken;
        });
        
        it('is defined', function() {
            expect(authInterceptor).toBeDefined();
        });
        
        describe('request()', function() {
            it('adds the Authorization header if user is authenticated', function() {
                var returnedConfig = authInterceptor.request({});
                
                expect(returnedConfig).toBeDefined();
                expect(returnedConfig.headers.Authorization).toBe(header);
            });
            
            it('preserves existing headers', function() {
                var returnedConfig = authInterceptor.request({
                    headers: {
                        CoolHeader: "cool_header"
                    }
                });
                
                expect(returnedConfig).toBeDefined();
                expect(returnedConfig.headers.CoolHeader).toBeDefined();
            });
            
            it('does not add Authorization header if user is not authenticated', function() {
                delete $window.sessionStorage.authToken;
                var returnedConfig = authInterceptor.request({});
                
                expect(returnedConfig).toBeDefined();
                expect(returnedConfig.headers.Authorization).toBeUndefined();
            });
        });
    }
});
