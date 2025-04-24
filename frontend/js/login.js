document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert('Login successful!');
        // можно редиректить на главную
        window.location.href = "index.html";
      } else {
        alert(data.error || 'Login failed!');
      }
    } catch (err) {
      alert('Ошибка подключения к серверу!');
      console.error(err);
    }
  });
  