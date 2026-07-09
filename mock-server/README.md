# LinkCare Mock Server

A shared, live mock API — both the patient app and the therapist dashboard connect to this single running server, instead of each importing static JSON files independently. This is what makes "build separately, connect eventually" actually work: a write from one app is visible to the other on next fetch, since both are reading/writing the same running server.

This is still a mock backend, not a real one — no authentication, no real database, no persistence beyond the server process running (data resets to `db.json`'s contents if the server restarts). That's intentional and matches the hackathon MVP scope in `docs/CLAUDE.md`.

## Setup (whoever runs this — one person, not both)

```bash
cd mock-server
npm install
npm start
```

This starts the server at **`http://localhost:4000`**. Keep this terminal running for the whole hackathon — both apps depend on it being up.

## Available endpoints

`json-server` auto-generates a full REST API from `db.json`'s top-level keys. All of the following support GET, and also POST/PUT/PATCH/DELETE for writes (e.g. a patient completing a session, a therapist assigning an exercise):

| Endpoint | Returns |
|---|---|
| `GET /patients` | All 6 patients |
| `GET /patients/:id` | One patient by id (e.g. `/patients/PT00018472`) |
| `GET /therapists` | All 4 therapists (1 PT, 3 OTs) |
| `GET /goals?patientId=PT00018472` | A patient's goals (filter by any field with `?field=value`) |
| `GET /exercises` | Full exercise library |
| `GET /assignments?patientId=PT00018472` | A patient's active programme |
| `GET /sessions?patientId=PT00018472` | A patient's session history |
| `GET /recoverySnapshots?patientId=PT00018472` | A patient's Recovery Snapshot |

**Writes work the same way a real REST API would:**
- `POST /sessions` — patient app writes a new session after Session Capture
- `POST /assignments` or `PATCH /assignments/:id` — therapist assigns/updates a programme
- `PATCH /patients/:id` — e.g. updating `attentionStatus` or `consistency`

## Network setup for two people on different machines

If you and your teammate are on the same wifi/network, replace `localhost` with your actual machine's local IP (e.g. `http://192.168.1.42:4000`) in both apps' fetch calls, so the other person's app can reach your running server. Find your local IP with `ipconfig getifaddr en0` (Mac) or `ipconfig` (Windows, look for IPv4 Address).

If you're not on the same network, one option is a tunnel tool like `ngrok` (`ngrok http 4000`) to expose the local server temporarily — only needed if you can't get on the same wifi.

## Important: only one person runs this

Don't both run separate instances of `json-server` — that defeats the whole point (two disconnected copies of the "shared" data again). Agree on who hosts it, and both apps point at that one instance.
