# careers/keepalive.py
import os, time, threading, requests

INTERVAL_SECONDS = int(os.getenv("KEEPALIVE_INTERVAL", "720"))
TARGET_URL = os.getenv("KEEPALIVE_URL")

def _loop():
    while True:
        try:
            url = TARGET_URL or os.getenv("RENDER_EXTERNAL_URL")
            if not url:
                time.sleep(INTERVAL_SECONDS)
                continue
            r = requests.get(url, timeout=10)
            print(f"[keepalive] ping {url} -> {r.status_code}")
        except Exception as e:
            print(f"[keepalive] error: {e}")
        time.sleep(INTERVAL_SECONDS)

_started = False
def start_keepalive():
    global _started
    if _started:
        return
    _started = True
    t = threading.Thread(target=_loop, daemon=True)
    t.start()