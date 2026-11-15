// Comentários salvos no navegador (localStorage), separados por receita
const chave = 'comentarios-' + document.body.dataset.receita;
const lista = document.getElementById('lista-comentarios');
const form = document.getElementById('form-comentario');

function carregar() {
  const comentarios = JSON.parse(localStorage.getItem(chave) || '[]');
  lista.innerHTML = '';
  if (comentarios.length === 0) {
    lista.innerHTML = '<p class="text-muted">Seja o primeiro a comentar!</p>';
    return;
  }
  comentarios.forEach(c => {
    const div = document.createElement('div');
    div.className = 'comentario';
    const nome = document.createElement('strong');
    nome.textContent = c.nome;
    const data = document.createElement('small');
    data.className = 'text-muted ms-2';
    data.textContent = c.data;
    const texto = document.createElement('p');
    texto.className = 'mb-0';
    texto.textContent = c.texto;
    div.append(nome, data, texto);
    lista.appendChild(div);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.checkValidity()) { form.classList.add('was-validated'); return; }
  const comentarios = JSON.parse(localStorage.getItem(chave) || '[]');
  comentarios.unshift({
    nome: form.nome.value.trim(),
    texto: form.texto.value.trim(),
    data: new Date().toLocaleString('pt-BR')
  });
  localStorage.setItem(chave, JSON.stringify(comentarios));
  form.reset();
  form.classList.remove('was-validated');
  carregar();
});

carregar();
