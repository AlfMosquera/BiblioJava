(() => {
  'use strict';

  const API_BASE = '/libros';

  /** @type {{id:number, titulo:string, autor:string, editorial:string, anioPublicacion:number}[]} */
  let libros = [];
  let editingId = null; // null => modo creación
  let pendingDeleteId = null;

  // ---- referencias DOM ----
  const cardsGrid = document.getElementById('cardsGrid');
  const emptyState = document.getElementById('emptyState');
  const loadState = document.getElementById('loadState');
  const errorState = document.getElementById('errorState');
  const errorDetail = document.getElementById('errorDetail');
  const countHint = document.getElementById('countHint');
  const searchInput = document.getElementById('searchInput');

  const connDot = document.getElementById('connDot');
  const connText = document.getElementById('connText');

  const modalBackdrop = document.getElementById('modalBackdrop');
  const cardForm = document.getElementById('cardForm');
  const formHeading = document.getElementById('formHeading');
  const formTab = document.getElementById('formTab');
  const formError = document.getElementById('formError');
  const fieldTitulo = document.getElementById('fieldTitulo');
  const fieldAutor = document.getElementById('fieldAutor');
  const fieldEditorial = document.getElementById('fieldEditorial');
  const fieldAnio = document.getElementById('fieldAnio');

  const confirmBackdrop = document.getElementById('confirmBackdrop');
  const confirmSubtitle = document.getElementById('confirmSubtitle');

  const toast = document.getElementById('toast');
  let toastTimer = null;

  // ---- utilidades ----
  function showToast(message, isError = false) {
    toast.textContent = message;
    toast.classList.toggle('toast--error', isError);
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 3200);
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  async function apiFetch(path, options = {}) {
    const res = await fetch(path, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    if (!res.ok) {
      const err = new Error(`HTTP ${res.status}`);
      err.status = res.status;
      throw err;
    }
    if (res.status === 204) return null;
    return res.json();
  }

  // ---- comprobación de conexión ----
  async function checkConnection() {
    try {
      await fetch('/Bienvenido');
      connDot.className = 'dot ok';
      connText.textContent = 'Conectado · puerto 5070';
    } catch {
      connDot.className = 'dot fail';
      connText.textContent = 'Sin conexión con el servidor';
    }
  }

  // ---- carga y render ----
  async function loadLibros() {
    loadState.hidden = false;
    errorState.hidden = true;
    emptyState.hidden = true;
    cardsGrid.hidden = true;
    try {
      libros = await apiFetch(API_BASE);
      loadState.hidden = true;
      cardsGrid.hidden = false;
      render();
    } catch (e) {
      loadState.hidden = true;
      errorState.hidden = false;
      errorDetail.textContent = e.status
        ? `El servidor respondió con un error (HTTP ${e.status}).`
        : 'Verifica que el servidor esté encendido en el puerto 5070.';
    }
  }

  function render() {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = query
      ? libros.filter((l) =>
          [l.titulo, l.autor, l.editorial,l.anioPublicacion].some((v) => String(v).toLowerCase().includes(query)))
      : libros;

    countHint.textContent = libros.length
      ? `${filtered.length} de ${libros.length} ficha(s) en el catálogo`
      : '';

    cardsGrid.innerHTML = '';

    if (libros.length === 0) {
      emptyState.hidden = false;
      return;
    }
    emptyState.hidden = true;

    if (filtered.length === 0) {
      cardsGrid.innerHTML = `<p class="hint" style="grid-column:1/-1;">Ninguna ficha coincide con “${escapeHtml(searchInput.value)}”.</p>`;
      return;
    }

    for (const libro of filtered) {
      cardsGrid.appendChild(buildCard(libro));
    }

    for (const [index, libro] of filtered.entries()) {
  const card = buildCard(libro);
  card.style.opacity = '0';
  card.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
  cardsGrid.appendChild(card);
}
  }

  function buildCard(libro) {
    const el = document.createElement('article');
    el.className = 'index-card';
    el.dataset.id = libro.id;
    el.innerHTML = `
      <div class="index-card__hole"></div>
      <span class="index-card__accession">N.° ${String(libro.id).padStart(3, '0')}</span>
      <h3 class="index-card__titulo">${escapeHtml(libro.titulo)}</h3>
      <p class="index-card__meta"><b>Autor:</b> ${escapeHtml(libro.autor)}</p>
      <p class="index-card__meta"><b>Editorial:</b> ${escapeHtml(libro.editorial)}</p>
      <p class="index-card__anio">${escapeHtml(libro.anioPublicacion)}</p>
      <div class="index-card__actions-row">
        <button class="btn btn--icon" data-action="edit" title="Editar ficha" aria-label="Editar ficha">
          <svg viewBox="0 0 20 20" fill="currentColor"><path d="M14.7 2.5a1.7 1.7 0 0 1 2.4 2.4l-1 1-2.4-2.4 1-1ZM12.6 4.6l2.4 2.4L6.4 15.6l-3.1.7.7-3.1 8.6-8.6Z"/></svg>
        </button>
        <button class="btn btn--icon" data-action="delete" title="Retirar ficha" aria-label="Retirar ficha">
          <svg viewBox="0 0 20 20" fill="currentColor"><path d="M7 2h6a1 1 0 0 1 1 1v1h3v2H3V4h3V3a1 1 0 0 1 1-1Zm-1 6h2v7H6V8Zm3 0h2v7H9V8Zm3 0h2v7h-2V8ZM4 6h12l-.8 10.6a2 2 0 0 1-2 1.9H6.8a2 2 0 0 1-2-1.9L4 6Z"/></svg>
        </button>
      </div>
    `;
    el.querySelector('[data-action="edit"]').addEventListener('click', () => openEdit(libro));
    el.querySelector('[data-action="delete"]').addEventListener('click', () => openConfirmDelete(libro));
    return el;
  }

  // ---- modal crear / editar ----
  function openCreate() {
    editingId = null;
    formHeading.textContent = 'Nueva ficha';
    formTab.textContent = 'N.° nueva';
    cardForm.reset();
    hideFormError();
    modalBackdrop.hidden = false;
    fieldTitulo.focus();
  }

  function openEdit(libro) {
    editingId = libro.id;
    formHeading.textContent = 'Editar ficha';
    formTab.textContent = `N.° ${String(libro.id).padStart(3, '0')}`;
    fieldTitulo.value = libro.titulo;
    fieldAutor.value = libro.autor;
    fieldEditorial.value = libro.editorial;
    fieldAnio.value = libro.anioPublicacion;
    hideFormError();
    modalBackdrop.hidden = false;
    fieldTitulo.focus();
  }

  function closeForm() {
    modalBackdrop.hidden = true;
    cardForm.reset();
  }

  function showFormError(msg) {
    formError.textContent = msg;
    formError.hidden = false;
  }
  function hideFormError() {
    formError.hidden = true;
    formError.textContent = '';
  }

  async function handleFormSubmit(evt) {
    evt.preventDefault();
    hideFormError();

    const payload = {
      titulo: fieldTitulo.value.trim(),
      autor: fieldAutor.value.trim(),
      editorial: fieldEditorial.value.trim(),
      anioPublicacion: Number(fieldAnio.value),
    };

    if (!payload.titulo || !payload.autor || !payload.editorial || !fieldAnio.value) {
      showFormError('Completa todos los campos de la ficha.');
      return;
    }

    const submitBtn = document.getElementById('submitForm');
    submitBtn.disabled = true;

    try {
      if (editingId === null) {
        const nuevo = await apiFetch(API_BASE, {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        libros.push(nuevo);
        showToast('Ficha añadida al catálogo.');
      } else {
        const actualizado = await apiFetch(`${API_BASE}/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
        libros = libros.map((l) => (l.id === editingId ? actualizado : l));
        showToast('Ficha actualizada.');
      }
      closeForm();
      render();
    } catch (e) {
      showFormError('No se pudo guardar la ficha. Intenta nuevamente.');
    } finally {
      submitBtn.disabled = false;
    }
  }

  // ---- eliminar ----
  function openConfirmDelete(libro) {
    pendingDeleteId = libro.id;
    confirmSubtitle.textContent = `“${libro.titulo}” — ${libro.autor}`;
    confirmBackdrop.hidden = false;
  }

  function closeConfirm() {
    confirmBackdrop.hidden = true;
    pendingDeleteId = null;
  }

  async function handleConfirmDelete() {
    if (pendingDeleteId === null) return;
    const id = pendingDeleteId;
    const cardEl = cardsGrid.querySelector(`.index-card[data-id="${id}"]`);
    closeConfirm();
    try {
      if (cardEl) {
        cardEl.classList.add('is-removing');
        await new Promise((r) => setTimeout(r, 220));
      }
      await apiFetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      libros = libros.filter((l) => l.id !== id);
      render();
      showToast('Ficha retirada del catálogo.');
    } catch {
      showToast('No se pudo retirar la ficha.', true);
      render();
    }
  }

  // ---- eventos ----
  document.getElementById('openNewCard').addEventListener('click', openCreate);
  document.getElementById('emptyStateAdd').addEventListener('click', openCreate);
  document.getElementById('cancelForm').addEventListener('click', closeForm);
  document.getElementById('retryBtn').addEventListener('click', loadLibros);
  cardForm.addEventListener('submit', handleFormSubmit);
  modalBackdrop.addEventListener('click', (e) => { if (e.target === modalBackdrop) closeForm(); });

  document.getElementById('confirmCancel').addEventListener('click', closeConfirm);
  document.getElementById('confirmDelete').addEventListener('click', handleConfirmDelete);
  confirmBackdrop.addEventListener('click', (e) => { if (e.target === confirmBackdrop) closeConfirm(); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!modalBackdrop.hidden) closeForm();
      if (!confirmBackdrop.hidden) closeConfirm();
    }
  });


  searchInput.addEventListener('input', render);

  // ---- inicio ----
  checkConnection();
  loadLibros();
})();
