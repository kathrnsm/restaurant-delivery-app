document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, address, phone, email, password }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert('Регистрация прошла успешно!');
        window.location.href = "login.html";
      } else {
        alert(data.error || 'Registration failed!');
      }
    } catch (err) {
      alert('Ошибка подключения к серверу!');
      console.error(err);
    }
  });
  