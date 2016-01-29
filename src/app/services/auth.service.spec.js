'use strict';

ngDescribe({
    name: 'Auth Service',
    modules: 'app',
    tests: function(authService, $window) {
        var authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
        var header = {
            "alg": "HS256",
            "typ": "JWT"
        };
        var payload = {
            "sub": "1234567890",
            "name": "John Doe",
            "admin": true
        }
        
        beforeEach(function() {
            $window.sessionStorage.authToken = authToken;
        });
        
        it('is defined', function() {
            expect(authService).toBeDefined();
        });
        
        describe('getAuthToken()', function() {
            it('fetches auth tokens', function() {
                expect(authService.getAuthToken()).toBe(authToken);
            });
            
            it('returns null if user is not logged in', function() {
                delete $window.sessionStorage.authToken;
                expect(authService.getAuthToken()).toBeNull();
            });
        });
        
        describe('getHeader()', function() {
            it('decodes and returns the auth token header', function() {
                expect(authService.getHeader()).toEqual(header);
            });
            
            it('returns {} if user is not authenticated', function() {
                delete $window.sessionStorage.authToken;
                expect(authService.getHeader()).toEqual({});
            });
        });
        
        describe('getPayload()', function() {
            it('decodes and returns the auth token payload', function() {
                expect(authService.getPayload()).toEqual(payload);
            });
            
            it('returns {} if user is not authenticated', function() {
                delete $window.sessionStorage.authToken;
                expect(authService.getPayload()).toEqual({});
            });
        });
        
        describe('isAuthenticated()', function() {
            it('returns true if user is authenticated', function() {
                expect(authService.isAuthenticated()).toBe(true);
            });
            
            it('returns false if user is not authenticated', function() {
                delete $window.sessionStorage.authToken;
                expect(authService.isAuthenticated()).toBe(false);
            });
        });
        
        describe('logout()', function() {
            it('deletes the auth token from session storage', function() {
                authService.logout();
                expect($window.sessionStorage.authToken).toBeUndefined();
            });
        });
        
        describe('_getJWTSection()', function() {
            it('throws error if a number other than 0 or 1 is used', function() {
                expect(function(){
                    authService._getJWTSection(-1);
                }).toThrow();
                
                expect(function(){
                    authService._getJWTSection(2);
                }).toThrow();
            });
        });
        
        describe('_url_base64_decode()', function() {
            it('decodes a base64 url encoded string', function() {
                expect(authService._url_base64_decode('dGVzdA')).toBe('test');
                expect(authService._url_base64_decode('dGVzdDE=')).toBe('test1');
                expect(authService._url_base64_decode('YWJjZGVhZmQ')).toBe('abcdeafd');
                
                expect(function() {
                    authService._url_base64_decode('E');
                }).toThrow();
            });
        });
    }
});
