document.addEventListener("DOMContentLoaded", async () => {
  const checkoutForm = document.getElementById("checkout-form");
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  if (!cart.length) {
    alert("Корзина пуста!");
    window.location.href = "/menu.html";
    return;
  }

  checkoutForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Вы не авторизованы!");
      return;
    }

    const address = document.getElementById("address").value.trim();
    const positions = cart;

    if (!address) {
      alert("Введите адрес доставки");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ address, positions })
      });

      const data = await res.json();
      if (res.ok) {
        alert("Заказ оформлен успешно!");
        localStorage.removeItem("cart");
        window.location.href = "/menu.html";
      } else {
        alert(data.message || "Ошибка при оформлении заказа");
      }
    } catch (err) {
      console.error("Ошибка оформления заказа:", err);
      alert("Не удалось оформить заказ");
    }
  });
});
