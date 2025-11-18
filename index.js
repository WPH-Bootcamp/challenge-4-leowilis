const prompt = require("prompt-sync")({ sigint: true });

let todos = [];

function generateUniqueId() {
  // TODO: Implementasi fungsi untuk menghasilkan ID unik
  // Ini akan digunakan secara internal untuk setiap objek to-do
  // Contoh: Gabungan waktu saat ini dan angka acak
  const timestamp = Date.now().toString();
  const random = (Math.floor(Math.random() * 100) + 1).toString();
  return timestamp + random;
}

function addTodo() {
  // TODO: Implementasi logika untuk menambah to-do baru
  // 1. Minta input teks to-do dari user menggunakan `prompt()`
  // 2. Validasi input: Pastikan teks tidak kosong atau hanya spasi
  // 3. Buat objek to-do baru dengan properti: id (dari generateUniqueId), text, dan isCompleted (boolean, default false)
  // 4. Tambahkan objek to-do ini ke array `todos`
  // 5. Beri feedback ke user bahwa to-do berhasil ditambahkan
  let text = prompt("Enter the to-do text: ");
  if (text.trim() === "" || text === null) {
    console.log("To-do text cannot be empty. or only spaces.");
    return;
  }
  let newTodo = {
    id: generateUniqueId(),
    text: text,
    isCompleted: false,
  };
  todos.push(newTodo);

  console.log(`To-do "${text}" added successfully`);
}

function markTodoCompleted() {
  // TODO: Implementasi logika untuk menandai to-do sebagai selesai
  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  // 2. Minta user memasukkan NOMOR to-do yang ingin ditandai sebagai selesai
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid (1 sampai jumlah to-do)
  // 4. Ubah properti `isCompleted` dari to-do yang dipilih menjadi `true`
  // 5. Beri feedback ke user bahwa to-do berhasil ditandai selesai
  // 6. Tangani kasus jika to-do sudah selesai
  listTodos();
  if (todos.length === 0) {
    return;
  }
  const input = prompt("Enter the Number of the to-do to mark as completed: ");
  const todoNumber = parseInt(input);

  if (isNaN(todoNumber) || todoNumber < 1 || todoNumber > todos.length) {
    console.log("Error: Invalid to-do number.");
    return;
  }
  const todoIndex = todoNumber - 1;
  const selectedTodo = todos[todoIndex];

  if (selectedTodo.isCompleted) {
    console.log(`To-do "${selectedTodo.text}" is already completed.`);
    return;
  }

  selectedTodo.isCompleted = true;
  console.log(`To-do "${selectedTodo.text}" marked as completed.`);
}

function deleteTodo() {
  // TODO: Implementasi logika untuk menghapus to-do
  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  // 2. Minta user memasukkan NOMOR to-do yang ingin dihapus
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid
  // 4. Hapus to-do yang dipilih dari array `todos`
  // 5. Beri feedback ke user bahwa to-do berhasil dihapus
  listTodos();
  if (todos.length === 0) {
    return;
  }
  const input = prompt("Enter the NUMBER of the to-do to delete: ");
  const todoNumber = parseInt(input);

  if (isNaN(todoNumber) || todoNumber < 1 || todoNumber > todos.length) {
    console.log("Error: Invalid to-do number.");
    return;
  }
  const todoIndex = todoNumber - 1;
  const selectedTodo = todos[todoIndex];
  todos.splice(todoIndex, 1);
  console.log(`To-do "${selectedTodo.text}" deleted.`);
}

function listTodos() {
  // TODO: Implementasi logika untuk menampilkan semua to-do
  // 1. Tampilkan judul daftar (misal: "--- YOUR TO-DO LIST ---")
  // 2. Cek apakah array `todos` kosong. Jika ya, tampilkan pesan "No to-dos to display."
  // 3. Jika tidak kosong, iterasi (loop) melalui array `todos`
  // 4. Untuk setiap to-do, tampilkan nomor urut, status ([DONE] atau [ACTIVE]), dan teks to-do
  //    Contoh format: "1. [ACTIVE] | Belajar JavaScript"
  // 5. Tampilkan garis penutup daftar
  console.log("\n--- YOUR TO-DO LIST ---");
  if (todos.length === 0) {
    console.log("No to-dos yet. Add one to get started!");
    return;
  }
  todos.forEach((todo, index) => {
    const status = todo.isCompleted ? "[DONE]" : "[ACTIVE]";
    console.log(`${index + 1}. ${status} | ${todo.text}`);
  });
  console.log("");
}

function runTodoApp() {
  // TODO: Implementasi logika utama aplikasi (menu interaktif)
  // Ini adalah "otak" aplikasi yang terus berjalan sampai user memilih untuk keluar
  let running = true;
  while (running) {
    // 1. Tampilkan menu perintah yang tersedia (add, complete, delete, list, exit)
    // 2. Minta user memasukkan perintah menggunakan `prompt()`
    // 3. Gunakan `switch` statement atau `if/else if` untuk memanggil fungsi yang sesuai
    //    berdasarkan perintah yang dimasukkan user
    // 4. Tangani perintah 'exit' untuk menghentikan loop aplikasi
    // 5. Tangani input perintah yang tidak valid
    console.log("=== WELCOME TO YOUR TO-DO LIST APP ===\n");
    console.log("Commands:");
    console.log("1. add    - Add a new to-do");
    console.log("2. list   - View all to-dos");
    console.log("3. complete - Mark a to-do as completed");
    console.log("4. delete - Delete a to-do");
    console.log("5. exit   - Exit the app\n");

    const command = prompt("Enter a command: ");
    const normalizedCommand = command ? command.trim().toLowerCase() : "";
    console.log("");

    switch (normalizedCommand) {
      case "add":
      case "1":
        addTodo();
        break;

      case "list":
      case "2":
        listTodos();
        break;

      case "complete":
      case "3":
        markTodoCompleted();
        break;

      case "delete":
      case "4":
        deleteTodo();
        break;

      case "exit":
      case "5":
        console.log("Goodbye! Your to-dos are waiting for you next time.");
        running = false;
        break;
      default:
        console.log("Invalid command. Please try again.\n");
    }
  }
}

// Jangan ubah bagian di bawah ini. Ini adalah cara Node.js menjalankan fungsi utama
// dan mengekspor fungsi-fungsi untuk pengujian (jika nanti ada).

if (require.main === module) {
  runTodoApp();
}

module.exports = {
  todos,
  generateUniqueId,
  addTodo,
  markTodoCompleted,
  deleteTodo,
  listTodos,
  runTodoApp,
};
