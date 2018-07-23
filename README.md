# catcat-webhook
A CatCat webhook for DialogFlow

## How to develop
```
# Go in dev
cd ./dev

# Deploy
. deploy

# Remote rebuild and compose up with logs
. remote reup
```

## TODO
### v1 : Product centric
- [x] User can see 1 event.
- [x] User can book 1 ticket.
- [ ] User can join event and use ticket.

### v2 : Chatbot centric
- [ ] User must provide `senderId` to get notify.

### v3 : User centric
- [ ] User must provide email before getting ticket.
- [ ] User will get ticket via email after booking.
- [ ] User can claim ticket with email.

### v4 : Payments centric
- [ ] User can pay online for defined products as ticket.
- [ ] User will get onchain ticket after payments complete.

### v5 : History centric
- [ ] User can see passed events via `Dialogflow` from `Firebase`.
- [ ] User can see joined events via `Dialogflow` from `Firebase`.

### v6 : Assist centric
- [ ] User will get remind via `Dialogflow` and email for booked events from `Webtasks` + `Firebase`.
- [ ] User will get notice via `Dialogflow` and email upcoming events from `Webtasks` + `Firebase`.

### v7 : Distributed centric
- [ ] User can have pri/pub key as password protected `PDF` via email

### v8 : Creator centric
- [ ] Host can create new events.

## TODREAM
- [ ] User can claim without internet (Matching)
- [ ] User can transfer ticket.
- [ ] User can trade ticket.
- [ ] User can claim ticket as royalty point.