import flask
import time
import logging
import os
import argparse

app = flask.Flask(__name__)

port = 8080
host = ""
directory = ""
victim = False
browser= ""

MAGIC = "8bf18cb9455f4a8e8fa93d14ab5ebb5d"

HTTP_METHODS = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'TRACE', 'PATCH']

# TODO websocket

@app.route('/sanitizer', methods=HTTP_METHODS)
def fetch_sanitizer():
    logging.info(f"[LOG] /sanitizer {flask.request.cookies}")
    html = f"<html>\nSANITIZER {flask.request.args.get('nonce')}\n{host}\n{MAGIC if victim and browser == 'chrome' else ''}\n</html>"
    response = flask.Response(html, content_type="text/html")
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    response.headers["Access-Control-Allow-Origin"] = f"http://{host}:{port}"
    response.headers["Debug-Header"] = f"{flask.request.method} SANITIZER"
    if victim and browser == 'chrome':
        response.headers["Magic-Header"] = MAGIC
    return response

@app.route('/sanitizer-cookie', methods=HTTP_METHODS)
def fetch_sanitizer_credentialed():
    logging.info(f"[LOG] /sanitizer-cookie {flask.request.cookies}")
    html = f"<html>\nSANITIZER COOKIE {flask.request.args.get('nonce')}\n"
    for k, v in flask.request.cookies.items():
        html += f"{k}: {v}\n"
    html += "</html>"
    response = flask.Response(html, content_type="text/html")
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    response.headers["Access-Control-Allow-Origin"] = f"http://{host}:{port}"
    response.headers["Debug-Header"] = f"{flask.request.method} SANITIZER COOKIE"

    if victim and browser == 'chrome':
        response.headers["Custom-Header"] = MAGIC
    return response

# @app.route('/sop/<name>')
# def sop_send(name):
#     with open(f"/data/sop/{name}") as f:
#         html = f.read()

#     response = flask.Response(html)
#     response.headers["X-Frame-Options"] = "SAMEORIGIN"
#     return response

@app.route('/<name>', methods=HTTP_METHODS)
def send(name):
    logging.info(f"[LOG] {name}")
    response = flask.make_response(flask.send_from_directory(directory, name))
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    response.headers["Content-Type"] = "text/html"
    response.headers["Access-Control-Allow-Origin"] = f"http://{host}:{port}"
    response.headers["Debug-Header"] = f"{flask.request.method} {name}"

    if victim and browser == 'chrome':
        response.headers["Custom-Header"] = MAGIC

    return response

@app.route('/seed')
def seed():
    logging.info(f"[LOG] /seed")
    response = flask.make_response(flask.send_from_directory(directory, "seed.html"))
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    response.headers["Access-Control-Allow-Origin"] = f"http://{host}:{port}"
    response.headers["Debug-Header"] = f"{flask.request.method} SEED"

    if victim:
        response.set_cookie('magic_httponly_strict', MAGIC, secure=True, httponly=True, samesite='Strict')
        response.set_cookie('magic_httponly_lax', MAGIC, secure=True, httponly=True, samesite='Strict')

    return response

@app.route('/<name>', methods=["OPIONS"])
def preflight(name):
    logging.info(f"[LOG] OPTIONS {name}")
    response = flask.make_response(204)
    response.headers["Access-Control-Allow-Origin"] = f"http://{host}:{port}"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Max-Age"] = "86400"
    return response

# @app.route('/svg/<name>')
# def svg_send(name):
#     with open("/data/svg/template.svg") as f:
#         html = f.read()
#     html = html.replace("<name>", name.split(".")[0])
#     r = flask.Response(html, mimetype='image/svg+xml')
#     return r

# @app.route('/svg_parent/<name>')
# def svg_parent_send(name):
#     with open("/data/svg/template.svg") as f:
#         html = f.read()
#     html = html.replace("<name>", f"{name.split('.')[0]}.parentNode")
#     r = flask.Response(html, mimetype='image/svg+xml')
#     return r

@app.route('/')
def hello_world():
    return f'Hello, idx_{host[-1]}!'

def main():
    parser = argparse.ArgumentParser(description="HTTP Server")
    parser.add_argument("-b", "--bind", help="host", type=str)
    parser.add_argument("-p", "--port", help="port", type=int, default=8080)
    parser.add_argument("-d", "--dir", help="dir", type=str)
    parser.add_argument("-v", "--victim", help="victim", action="store_true")
    parser.add_argument(
        "--browser",
        help="browser to fuzz",
        type=str,
        choices=["chrome", "firefox"],
    )
    args = parser.parse_args()

    global port, host, directory, victim, browser
    port = args.port
    host = args.bind
    directory = args.dir# if os.path.isabs(args.dir) else os.path.join(os.getcwd(), args.dir)
    victim = args.victim
    browser = args.browser

    # logging.basicConfig(filename = os.path.join(directory,"server.log"), level = logging.DEBUG)
    logging.basicConfig(level=logging.DEBUG)

    logging.info(f"[LOG] Starting server on {host}:{port} serving {directory}")
    logging.info(f"[LOG] Victim: {victim}")
    logging.info(f"[LOG] Browser: {browser}")

    # app.debug=True
    app.run(host=host, port=port)


if __name__ == '__main__':
    main()