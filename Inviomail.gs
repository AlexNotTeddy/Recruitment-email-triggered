function inviaEmailDaFoglio() {
  const spreadsheetId = '1_VARDe4_sNk71J5KVI7es4ooO0RBWmv-fuYMtZ5ee4E';
  const foglioNome = 'Form Responses 1';

  const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(foglioNome);
  const dati = sheet.getDataRange().getValues();
  const intestazioni = dati[0];

  const indiceEmail = intestazioni.indexOf("Se sei interessato al progetto lascia la tua email oppure scrivi al tuo contatto (chi ti ha mandata il sondaggio) per saperne di più");
  let indiceInviata = intestazioni.indexOf("Inviata");

  // Se colonna "Inviata" non esiste, la crea
  if (indiceInviata === -1) {
    indiceInviata = intestazioni.length;
    sheet.getRange(1, indiceInviata + 1).setValue("Inviata");
  }

  // Aggiungi l'indice della colonna D per verificare il valore "Talento"
  const indiceTipo = intestazioni.indexOf("In quale campo lavori?"); // Assumendo che la colonna D sia chiamata "Tipo" o simile. Modifica se necessario.

  let inviate = 0; // Inizializza la variabile per contare il numero di email inviate
  const emailInviare = 10; // Limite di 10 email da inviare per esecuzione

  for (let i = 1; i < dati.length && inviate < emailInviare; i++) {
    const riga = dati[i];
    const emailDestinatario = riga[indiceEmail];
    const statoInviata = riga[indiceInviata];
    const tipo = riga[indiceTipo]; // Ottieni il valore della colonna D

    // Verifica se il tipo è "Talento (modello, attore)" prima di inviare l'email
    if (emailDestinatario && String(statoInviata) !== "1" && (tipo === "Talento (modello, attore)" || tipo === "Talent (model, actor)")) {
      try {
        const nome = riga[1]; // seconda colonna

        const destinatario = riga[indiceEmail]; // riga[indiceEmail] è dove prendi l'email

        const oggetto = 'Hai mai pensato di costruire qualcosa di tuo?';

        const corpoEmailHTML = `
        <div style="font-family: Helvetica, Arial, sans-serif; line-height: 1.7; font-size: 16px; color: #222; padding: 20px 0;">
          <!-- Banner with Logo -->
          <div style="text-align: center; padding-bottom: 20px;">
            <img src="https://i.imgur.com/KdJu0Qo.png" alt="Logo CASTX" style="max-width: 400px;">
            <hr style="border: 0; border-top: 2px solid #ccc; margin: 20px 0;">
          </div>

          <!-- Introduction -->
          <p>Ciao <strong>${nome}</strong>,</p>

          <p>sono Alex e faccio il <strong>modello e l’attore come te</strong>.</p>

          <p>Innanzitutto ti <strong>ringrazio</strong> per aver risposto al nostro sondaggio dedicato ai modelli.</p>

          <p>Oggi ti scrivo per un motivo speciale!</p>

          <p>Sto lavorando a <strong>CASTX</strong>, una piattaforma che punta a <strong>rivoluzionare il mondo del casting</strong>.  
          È un progetto nato da dentro il settore, con l’obiettivo di renderlo più <strong>trasparente</strong>, <strong>meritocratico</strong> e <strong>smart</strong>.</p>

          <p><strong>CASTX</strong> è già stata selezionata per un <strong>programma internazionale di incubazione</strong> chiamato <em>Bridge for Billions</em>,  
          che ci accompagnerà fino a <strong>settembre</strong>, quando presenteremo il progetto a investitori e stakeholder a Roma, in occasione del <strong>Demo Day</strong>.</p>

          <p>Ma prima di tutto, vogliamo costruirlo con le <strong>persone giuste</strong>.</p>

          <p>Per questo sto cercando qualcuno che unisca <strong>competenze e visione</strong>, anche se magari è ancora all’inizio del proprio percorso professionale.</p>

          <p><strong>Le tre figure che sto cercando in questa fase:</strong></p>

          <ul>
            <li><strong>UX/UI designer:</strong> per aiutarci a disegnare un’interfaccia elegante e intuitiva, capace di parlare a modelli, agenzie e brand.</li>
            <li><strong>Profilo legale:</strong> per definire i contratti, i diritti d’immagine e garantire che tutto sia conforme (anche in ottica GDPR).</li>
            <li><strong>Sviluppatore web:</strong> sviluppatore frontend con esperienza in HTML, CSS e JavaScript (o qualsiasi altra tecnologia web) per creare interfacce web moderne e accattivanti.</li>
          </ul>

          <p>Non serve essere “arrivati”. Cerco <strong>persone sveglie, curiose, capaci di pensare in grande</strong> — e con voglia di fare.</p>

          <!-- Call to Action -->
          <div style="text-align: center; padding: 20px 0;">
            <a href="https://forms.gle/EFybKXFJagPsyRBT6" target="_blank" 
              style="background-color: #0066cc; color: white; padding: 12px 24px; font-size: 16px; text-decoration: none; border-radius: 5px;">
              Candidati Ora
            </a>
          </div>

          <p>Spero davvero di leggere il tuo nome tra le risposte.</p>

          <p>A presto,<br>
            <strong>Il team di CASTX</strong>
          </p>

          <hr style="border: 0; border-top: 2px solid #ccc; margin: 40px 0;">


          <p style="text-align: center; font-size: 12px; color: #777;">Se non desideri ricevere ulteriori email da noi, clicca qui per annullare l'iscrizione.</p>
        </div>
      `;

        // Log per il debugging
        Logger.log("Corpo email HTML: " + corpoEmailHTML);
        Logger.log("Destinatario: " + destinatario);

        // Invio dell'email
        GmailApp.sendEmail(destinatario, oggetto, '', {
          htmlBody: corpoEmailHTML,
          name: 'CASTX',
          headers: {
            'Content-Type': 'text/html; charset=UTF-8'
          }
        });

        // Segna l'email come inviata
        sheet.getRange(i + 1, indiceInviata + 1).setValue("1");
        inviate++;

      } catch (e) {
        Logger.log(`❌ Errore nell'invio a ${emailDestinatario}: ${e.message}`);
      }
    }
  }

  Logger.log(`✅ Email inviate: ${inviate}`);
}
