document.addEventListener("DOMContentLoaded", async () => {
    const menuContainer = document.getElementById("menu");
  
    try {
      const res = await fetch("http://localhost:3000/api/menu");
      const items = await res.json();
  
      items.forEach(item => {
        const div = document.createElement("div");
        div.className = "card p-3 m-2";
        div.style.width = "18rem";
        div.innerHTML = `
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">Цена: ${item.price} руб.</p>
            <button class="btn btn-primary" onclick="addToCart(${item.id}, '${item.name}', ${item.price})">Добавить в корзину</button>
          </div>
        </div>
      `;
        menuContainer.appendChild(div);
      });
  
      document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          addToCart(id);
        });
      });
    } catch (err) {
      console.error("Ошибка загрузки меню:", err);
      alert("Не удалось загрузить меню.");
    }
  });
  
  function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} добавлен в корзину`);
  }
  
  