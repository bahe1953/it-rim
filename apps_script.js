// === Google Apps Script - a coller dans script.google.com ===
// 1. Aller sur https://sheets.google.com et creer une nouvelle feuille "Leads Mouhassib".
// 2. Dans la feuille, Extensions > Apps Script.
// 3. Remplacer tout le contenu par ce code, puis Enregistrer.
// 4. Cliquer sur "Deployer" > "Nouveau deploiement" > type "Application Web".
//    - Executer en tant que : Moi (votre compte Gmail)
//    - Qui a acces : Tout le monde
// 5. Copier l'URL donnee (se termine par /exec) : c'est GOOGLE_SHEET_WEBHOOK_URL.
//
// Si ce fichier a deja ete deploye et que vous ajoutez doGet() plus tard :
// Deployer > Gerer les deploiements > crayon (Modifier) > Version : Nouvelle version > Deployer.
// Cela garde la meme URL /exec (pas besoin de la changer dans Vercel).

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  // Ecrit l'en-tete une seule fois si la feuille est vide.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Date', 'Nom', 'Email', 'Telephone', 'Ville', 'Produit']);
  }

  sheet.appendRow([
    data.date || new Date().toISOString(),
    data.nom || '',
    data.email || '',
    data.telephone || '',
    data.ville || '',
    data.produit || '',
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Retourne le nombre total de telechargements (nombre de lignes, hors en-tete).
// Utilise par le site pour afficher le compteur public.
function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();
  var count = lastRow > 0 ? lastRow - 1 : 0;

  return ContentService
    .createTextOutput(JSON.stringify({ count: count }))
    .setMimeType(ContentService.MimeType.JSON);
}
