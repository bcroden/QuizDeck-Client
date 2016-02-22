'use strict';

describe('Auth Service', function() {
    var authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
    var header = {
        "alg": "HS256",
        "typ": "JWT"
    };
    var payload = {
        "sub": "1234567890",
        "name": "John Doe",
        "admin": true
    };
    
    var $injector;
    var $httpBackend;
    var $window;
    
    var authService;
    var serverUrl;
    
    beforeEach(angular.mock.module('app'));
    
    beforeEach(angular.mock.inject(function(_$injector_) {
        $injector = _$injector_;
        $httpBackend = $injector.get('$httpBackend');
        $window = $injector.get('$window');
        
        authService = $injector.get('authService');
        serverUrl = $injector.get('serverUrl');
    }));
    
    beforeEach(function() {
        $window.sessionStorage.authToken = authToken;
    });
    
    it('is defined', function() {
        expect(authService).toBeDefined();
    });
    
    describe('getAuthToken()', function () {
        it('fetches auth tokens', function () {
            expect(authService.getAuthToken()).toBe(authToken);
        });

        it('returns null if user is not logged in', function () {
            delete $window.sessionStorage.authToken;
            expect(authService.getAuthToken()).toBeNull();
        });
    });
    
    describe('getHeader()', function () {
        it('decodes and returns the auth token header', function () {
            expect(authService.getHeader()).toEqual(header);
        });

        it('returns {} if user is not authenticated', function () {
            delete $window.sessionStorage.authToken;
            expect(authService.getHeader()).toEqual({});
        });
    });
    
    describe('getPayload()', function () {
        it('decodes and returns the auth token payload', function () {
            expect(authService.getPayload()).toEqual(payload);
        });

        it('returns {} if user is not authenticated', function () {
            delete $window.sessionStorage.authToken;
            expect(authService.getPayload()).toEqual({});
        });
    });

    describe('isAuthenticated()', function () {
        it('returns true if user is authenticated', function () {
            expect(authService.isAuthenticated()).toBe(true);
        });

        it('returns false if user is not authenticated', function () {
            delete $window.sessionStorage.authToken;
            expect(authService.isAuthenticated()).toBe(false);
        });
    });
    
    describe('hasRole()', function () {
        it('returns true if user has the specified role', function () {
            $window.sessionStorage.authToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJRdWl6RGVjayIsInVzZXIiOiJ0ZXN0VXNlciIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNDU1ODYyNDIwfQ.fab-0MhrGCQSwdr15xBCu5A7piFKd4pxQgRwf74JDwE';
            expect(authService.hasRole('User')).toBe(true);
        });

        it('returns false if user does not have the specified role', function () {
            delete $window.sessionStorage.authToken;
            expect(authService.hasRole('User')).toBe(false);
        });
    });
    
    describe('createAccount()', function() {
        it('resolves if a new user is created on the server', function() {
            $httpBackend
                .expect('POST', serverUrl + '/rest/nonsecure/createAccount')
                .respond(200, {
                    token: 'a.b.c'
                })
            
            authService
                .createAccount({
                    username: 'test',
                    password: 'test',
                    email: 'test@test.com'
                })
                .then(function(isAuthenticated) {
                    expect(isAuthenticated).toBe(true);
                });
            
            $httpBackend.flush();
        });
        
        it('rejects if a new user is not created on the server', function() {
            $httpBackend
                .expect('POST', serverUrl + '/rest/nonsecure/createAccount')
                .respond(400)
            
            authService
                .createAccount({
                    username: 'test',
                    password: 'test',
                    email: 'test@test.com'
                })
                .catch(function(isAuthenticated) {
                    expect(isAuthenticated).toBe(false);
                });
            
            $httpBackend.flush();
        });
        
        it('saves the auth token to sessionStorage', function() {
            $httpBackend
                .expect('POST', serverUrl + '/rest/nonsecure/createAccount')
                .respond(200, {
                    token: 'a.b.c'
                })
            
            authService.createAccount({
                username: 'test',
                password: 'test',
                email: 'test@test.com'
            });
            
            $httpBackend.flush();
            expect($window.sessionStorage.authToken).toBe('a.b.c');
        });
    });
    
    describe('login()', function() {
        it('resolves if a user is logged in on the server', function() {
            $httpBackend
                .expect('POST', serverUrl + '/rest/nonsecure/login')
                .respond(200, {
                    token: 'a.b.c'
                })
            
            authService
                .login({
                    username: 'test',
                    password: 'test'
                })
                .then(function(isAuthenticated) {
                    expect(isAuthenticated).toBe(true);
                });
            
            $httpBackend.flush();
        });
        
        it('rejects if a user is not logged in on the server', function() {
            $httpBackend
                .expect('POST', serverUrl + '/rest/nonsecure/login')
                .respond(400)
            
            authService
                .login({
                    username: 'test',
                    password: 'test'
                })
                .catch(function(isAuthenticated) {
                    expect(isAuthenticated).toBe(false);
                });
            
            $httpBackend.flush();
        });
        
        it('saves the auth token to sessionStorage', function() {
            $httpBackend
                .expect('POST', serverUrl + '/rest/nonsecure/login')
                .respond(200, {
                    token: 'a.b.c'
                })
            
            authService.login({
                username: 'test',
                password: 'test'
            });
            
            $httpBackend.flush();
            expect($window.sessionStorage.authToken).toBe('a.b.c');
        });
    });

    describe('logout()', function () {
        it('deletes the auth token from session storage', function () {
            authService.logout();
            expect($window.sessionStorage.authToken).toBeUndefined();
        });
    });

    describe('getJWTSection()', function () {
        it('throws error if a number other than 0 or 1 is used', function () {
            expect(function () {
                authService._getJWTSection(-1);
            }).toThrow();

            expect(function () {
                authService._getJWTSection(2);
            }).toThrow();
        });
    });

    describe('url_base64_decode()', function () {
        it('decodes a base64 url encoded string', function () {
            expect(authService._url_base64_decode('dGVzdA')).toBe('test');
            expect(authService._url_base64_decode('dGVzdDE=')).toBe('test1');
            expect(authService._url_base64_decode('YWJjZGVhZmQ')).toBe('abcdeafd');

            expect(function () {
                authService._url_base64_decode('E');
            }).toThrow();
        });
    });
});
