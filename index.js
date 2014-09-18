var connect = require('connect');
var login = require('./login');

var app = connect();

app.use(connect.json()); // Parse JSON request body into `request.body`
app.use(connect.urlencoded()); // Parse form in request body into `request.body`
app.use(connect.cookieParser()); // Parse cookies in the request headers into `request.cookies`
app.use(connect.query()); // Parse query string into `request.query`

app.use('/', main);

function main(request, response, next) {
        switch (request.method) {
                case 'GET': get(request, response); break;
                case 'POST': post(request, response); break;
                case 'DELETE': del(request, response); break;
                case 'PUT': put(request, response); break;
        }
};

function get(request, response) {
var cookies = request.cookies;
        console.log(cookies);
        if ('session_id' in cookies) {
                var mySessionId = cookies['session_id'];
                if ( login.isLoggedIn(mySessionId) ) {
                        response.setHeader('Set-Cookie', 'session_id=' + mySessionId);
                        response.end(login.hello(mySessionId));
                } else {
                        response.end("Invalid session!!!\n");
                }
        } else {
                response.end("Please login using HTTP POST\n");
        }
};

function post(request, response) {
        // TODO: read 'name and email from the request.body'
        var name = request.body["name"];
        var email = request.body["email"];
         var mySessionId = login.login(name, email);
        // TODO: set new session id to the 'session_id' cookie in the response

 response.setHeader('content-type',"text/html");
        response.setHeader('Set-Cookie','session_id=' + mySessionId);
        // replace "Logged In" response with response.end(login.hello(newSessionId));

        response.end(login.hello(mySessionId));
};

function del(request, response) {
        console.log("DELETE:: Logout from the server");
        // TODO: remove session id via login.logout(xxx)
        // No need to set session id in the response cookies since you just logged out!
       var c = request.cookies;
         var sessionid = c['session_id']
        login.logout(sessionid);
        response.end('Logged out from the server\n');
};

function put(request, response) {
                //console.log("PUT:: Re-generate new seesion_id for the same user");
        var cookies = request.cookies;
 console.log(cookies);
        if ('session_id' in cookies) {

var mySessionId = cookies['session_id'];
                if ( login.isLoggedIn(mySessionId)) {
        var newsessionId = login.createNewSessionId(mySessionId);
        response.writeHead(200,{'Content-type':'text/html','Set-Cookie':'session_id='+newsessionId});
                        response.end(login.hello(newsessionId));
            }
                else
                {response.end("Invalid session!!!\n");}
        }
        else
        {response.end("Please login via HTTP POST\n");
        }

};

app.listen(8000);

console.log("Node.JS server running at 8000...");
