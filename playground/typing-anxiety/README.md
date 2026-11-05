## Messages

Edit `messages.csv` to change the messages. Keep the `message` header and put one
message on each row. Wrap messages containing commas, quotes, or line breaks in
double quotes; escape a quote by doubling it (`""`). Blank messages are skipped.

After a typing round, a message may briefly appear, change to “deleted”, then
disappear completely. Settings control the chance per round (default 40%), the
flash duration (0.73 seconds), and how long “deleted” stays (4 seconds). Typing
can resume beneath “deleted” while it remains on screen. Set the chance to 0%
for typing only. Restart or Reset clears any current message.

When opening `index.html` directly, open Settings → Messages → Message CSV and
choose `messages.csv`. Browsers require you to select local files before they can
be read. Select it again after reloading the page or editing the CSV.

When served over HTTP, `messages.csv` loads automatically. For example, run
`python3 -m http.server 8000` and open <http://localhost:8000/>. Reload after editing
the CSV. The file picker also lets you choose another CSV. If loading fails, the
typing sequence continues and Settings shows the error.

## Roadmap
- [x] v1
- [x] add message flashes + deleted
- [ ] sound?
- [ ] mobile: make it realistic?
