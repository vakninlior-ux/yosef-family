(function () {
  var btn = document.getElementById('dl-ketubah'), F = window.FAMILY;
  if (!btn || !F || !F.docx) return;
  btn.hidden = false;
  btn.addEventListener('click', function () {
    var bin = atob(F.docx), u = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    var url = URL.createObjectURL(new Blob([u], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }));
    var a = document.createElement('a'); a.href = url; a.download = 'ketubah_transcription_and_translation.docx';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  });
})();
