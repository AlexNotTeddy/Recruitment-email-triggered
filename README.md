Obiettivo del codice:
Inviare un'email a destinatari specifici in un foglio Google Sheets in base a certe condizioni (come la presenza di un'email e il valore della colonna "Tipo"). Ogni email inviata deve essere segnata come "Inviata" nel foglio.
Input dati ai programmatori:
ID del foglio di lavoro:


spreadsheetId: '1tZw4jEyOb8sybCfEDUiNenmzJ2wm_buYBC9V4h0OA2E'.


Questo è l'ID univoco del foglio di lavoro di Google Sheets contenente i dati su cui operare.


Nome del foglio:


foglioNome: 'Form Responses 1'.


Questo è il nome del foglio di lavoro (dentro Google Sheets) che contiene le risposte dei form.


Colonne nel foglio:


Il codice si aspetta che il foglio di lavoro contenga almeno le seguenti colonne:


Colonna contenente l'email: identificata tramite l'intestazione che contiene la frase "Se sei interessato al progetto lascia la tua email oppure scrivi al tuo contatto (chi ti ha mandata il sondaggio) per saperne di più".


Colonna che segna se l'email è stata inviata: chiamata "Inviata", che segna le righe a cui è stata inviata un'email. Se la colonna non esiste, viene creata.


Colonna che indica il tipo di persona (Agenzia, Brand, Talento, ecc.): identificata tramite l'intestazione "In quale campo lavori?" (che si assume essere la colonna D nel foglio di lavoro). Il codice verifica che il valore in questa colonna sia "Talento (modello, attore)" prima di inviare l'email.


Condizioni per inviare l'email:


L'email viene inviata solo se:


La colonna dell'email non è vuota.


Il valore della colonna "Inviata" è diverso da "1" (per evitare di inviare email duplicate).


Il valore della colonna "Tipo" (o la colonna "In quale campo lavori?") deve essere esattamente "Talento (modello, attore)".


Dettagli dell'email:


Oggetto dell'email: 'Hai mai pensato di costruire qualcosa di tuo?'.


Corpo dell'email: Un HTML generato dinamicamente che include:


Un'introduzione personalizzata con il nome del destinatario (preso dalla seconda colonna del foglio).


Descrizione del progetto CASTX (una piattaforma per il casting).


Una lista di figure ricercate (UX/UI designer, Profilo legale, Sviluppatore web).


Un link al form di candidatura: [Candidati Ora](https://forms.gle/EFybKXFJagPsyRBT6).


Un'opzione per annullare l'iscrizione.


Logging e monitoraggio:


Logger.log viene usato per:


Registrare il corpo dell'email HTML per debugging.


Registrare il destinatario dell'email per debug.


Registrare gli errori se l'invio dell'email fallisce (cattura delle eccezioni).


Registrare quante email sono state effettivamente inviate.


Gestione delle risposte:


Dopo che l'email è stata inviata, nella colonna "Inviata" viene inserito il valore "1" per indicare che l'email è stata inviata e non deve essere inviata di nuovo.


Output:
L'email viene inviata tramite Gmail, e l'utente riceve una mail con il corpo HTML formattato.


Viene aggiornato il foglio con la scritta "1" nella colonna "Inviata" per ogni riga a cui è stata inviata un'email.


Viene mostrato un log finale nel quale viene indicato quante email sono state inviate con successo.


Dettaglio delle specifiche fornite:
Indirizzo email destinatario: La colonna contenente l'indirizzo email viene identificata tramite l'intestazione specifica.


Controllo delle email inviate: La colonna "Inviata" è usata per segnare se un'email è stata inviata, per evitare duplicazioni.


Selezione per tipo di destinatario: Il valore "Talento (modello, attore)" deve essere presente nella colonna "In quale campo lavori?" per inviare l'email.


Formattazione dell'email: L'email è formattata in HTML con un design e un contenuto specifico, includendo un link per candidarsi a una posizione.


Controllo di errori: Gli errori di invio vengono catturati e registrati nel log, evitando che l'invio continui in caso di problemi.


In sintesi:
Gli input ai programmatori per creare questo codice hanno incluso:
La gestione dei dati in un foglio Google Sheets.


Il controllo su quali righe devono ricevere l'email (basato sul contenuto di specifiche colonne).


L'invio automatico di un'email personalizzata tramite Gmail.


La gestione del flag per evitare invii ripetuti.


La registrazione e gestione degli errori e dei successi nel processo di invio.
