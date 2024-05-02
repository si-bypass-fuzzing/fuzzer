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

MAGIC = "8bf18cb9455f4a8e8fa93d14ab5ebb5d"

# TODO websocket

@app.route('/sanitizer')
def fetch_sanitizer():
    logging.info(f"[LOG] /sanitizer")
    html = f"<html>\nsanitizer\n{host}\n{MAGIC if victim else ''}\n</html>"
    response = flask.Response(html, content_type="text/html")
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    if victim:
        response.headers["Custom-Header"] = MAGIC
        response.set_cookie('magic', MAGIC, secure=True, httponly=True, samesite='Strict')

    return response

@app.route('/sanitizer-cookie')
def fetch_sanitizer_credentialed():
    logging.info(f"[LOG] /sanitizer-cookie {flask.request.cookies}")
    html = "<html>\nsanitizer-cookie\n"
    for k, v in flask.request.cookies.items():
        html += f"{k}: {v}\n"
    html += "</html>"
    response = flask.Response(html, content_type="text/html")
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    if victim:
        response.headers["Custom-Header"] = MAGIC
        response.set_cookie('magic', MAGIC, secure=True, httponly=True, samesite='Strict')
    return response

# @app.route('/sop/<name>')
# def sop_send(name):
#     with open(f"/data/sop/{name}") as f:
#         html = f.read()

#     response = flask.Response(html)
#     response.headers["X-Frame-Options"] = "SAMEORIGIN"
#     return response

@app.route('/<name>')
def send(name):
    logging.info(f"[LOG] {name}")
    response = flask.make_response(flask.send_from_directory(directory, name))
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    response.headers["Content-Type"] = "text/html"
    if victim:
        response.headers["Custom-Header"] = MAGIC
        response.set_cookie('magic', MAGIC, secure=True, httponly=True, samesite='Strict')

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
    args = parser.parse_args()

    global port, host, directory, victim
    port = args.port
    host = args.bind
    directory = args.dir if os.path.isabs(args.dir) else os.path.join(os.getcwd(), args.dir)
    victim = args.victim

    # logging.basicConfig(filename = os.path.join(directory,"server.log"), level = logging.DEBUG)
    logging.basicConfig(level=logging.DEBUG)

    # app.debug=True
    app.run(host=host, port=port)


if __name__ == '__main__':
    main()