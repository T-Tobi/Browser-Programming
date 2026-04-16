const API = "http://localhost:3000/api/notes";

// Load all notes from database
async function loadNotes() {
  const res = await fetch(API);
  const notes = await res.json();
  displayNotes(notes);
}

// Create a new note
async function addNote(content) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  const newNote = await res.json();
  return newNote;
}

// Delete a note
async function deleteNote(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
}

// Display notes in the list
function displayNotes(notes) {
  const list = document.getElementById("notesList");
  const emptyState = document.getElementById("emptyState");

  list.innerHTML = "";

  if (notes.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  notes.forEach((note) => {
    const li = document.createElement("li");

    const p = document.createElement("p");
    p.textContent = note.content;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = async () => {
      await deleteNote(note.id);
      loadNotes();
    };

    li.appendChild(p);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// Add note on button click
const addBtn = document.getElementById("addBtn");
const noteInput = document.getElementById("noteInput");

addBtn.addEventListener("click", async () => {
  const content = noteInput.value.trim();
  if (!content) return;
  await addNote(content);
  noteInput.value = "";
  loadNotes();
});

// Load notes when page opens
loadNotes();
