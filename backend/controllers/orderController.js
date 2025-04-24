import { db } from '../db.js';

export const createOrder = async (req, res) => {
  try {
    const { address, positions } = req.body;
    const clientId = req.client?.id;

    console.log('clientId:', clientId);
    console.log('address:', address);
    console.log('positions:', positions);

    if (!clientId || !address) {
      return res.status(400).json({ error: 'clientId и адрес обязательны!' });
    }

    if (!positions || !Array.isArray(positions) || positions.length === 0) {
      return res.status(400).json({ error: 'Позиции заказа обязательны и должны быть массивом' });
    }

    // Проверка каждой позиции на обязательные поля
    for (const pos of positions) {
      if (!pos.name || typeof pos.price !== 'number' || typeof pos.quantity !== 'number') {
        return res.status(400).json({ error: 'Каждая позиция должна содержать name, price и quantity' });
      }
    }

    const [result] = await db.execute(
      'INSERT INTO Orders (clientId, orderDate, address) VALUES (?, NOW(), ?)',
      [clientId, address]
    );

    const orderId = result.insertId;

    for (const position of positions) {
      await db.execute(
        'INSERT INTO OrderPositions (orderId, name, price, quantity) VALUES (?, ?, ?, ?)',
        [orderId, position.name, position.price, position.quantity]
      );
    }

    res.status(201).json({ message: 'Заказ создан успешно', orderId });
  } catch (err) {
    console.error('Ошибка создания заказа:', err);
    res.status(500).json({ error: 'Ошибка при создании заказа' });
  }
};
