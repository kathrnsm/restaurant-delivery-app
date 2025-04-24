// Ждём полной загрузки DOM 
document.addEventListener("DOMContentLoaded", () => {
  //Обработка формы входа
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const phone = document.getElementById("login-phone")?.value.trim();
      const password = document.getElementById("login-password")?.value.trim();

      if (!phone || !password) {
        alert("Заполните все поля.");
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, password }),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("token", data.token);
          window.location.href = "menu.html";
        } else {
          alert(data.message || "Ошибка входа");
        }
      } catch (err) {
        console.error("Ошибка запроса:", err);
        alert("Ошибка соединения с сервером");
      }
    });
  }

  //Обработка формы регистрации
  const registerForm = document.getElementById("register-form");

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("register-name")?.value.trim();
      const address = document.getElementById("register-address")?.value.trim();
      const phone = document.getElementById("register-phone")?.value.trim();
      const password = document.getElementById("register-password")?.value.trim();

      if (!name || !address || !phone || !password) {
        alert("Заполните все поля.");
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, address, phone, password }),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem('token', data.token); 
          alert("Регистрация успешна!");
          window.location.href = "menu.html";
        } else {
          alert(data.message || "Ошибка регистрации");
        }
      } catch (err) {
        console.error("Ошибка запроса:", err);
        alert("Ошибка соединения с сервером");
      }
    });
  }
});
