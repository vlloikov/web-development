"""Local preview with a discard-only POST receiver for HTML forms in lab 06."""

import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit


class LabHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        # Only this local demonstration endpoint accepts submissions.
        if urlsplit(self.path).path != "/form-result.html":
            self.send_error(405, "POST is supported only for the demo form endpoint")
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            self.send_error(400, "Invalid Content-Length")
            return
        if not 0 <= length <= 8 * 1024 * 1024:
            self.send_error(413, "The complete request must be no larger than 8 MiB")
            return
        # Consume the request without parsing, logging, storing or echoing fields/files.
        self.rfile.read(length)
        self.send_response(303)
        self.send_header("Location", "/form-result.html")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", "0")
        self.end_headers()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8000)
    parser.add_argument("--host", default="127.0.0.1")
    args = parser.parse_args()
    site = Path(__file__).resolve().parents[1] / "site"
    handler = partial(LabHandler, directory=str(site))
    with ThreadingHTTPServer((args.host, args.port), handler) as server:
        print(f"Lab 06: http://{args.host}:{args.port}/", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nPreview stopped.")


if __name__ == "__main__":
    main()
