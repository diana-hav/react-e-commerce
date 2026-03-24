# Локальне зберігання даних

## Структура директорії `data/`

- `localData.json` - загальний файл для користувачів та замовлень (початковий)
- `users.json` - файл для користувачів
- `orders.json` - файл для замовлень

## Формат даних

### Користувач (users.json)
```json
{
  "id": "1234567890",
  "username": "testuser",
  "email": "test@example.com",
  "password": "hashed_password",
  "phone": "+380123456789",
  "createdAt": "2023-12-01T10:00:00.000Z"
}
```

### Замовлення (orders.json)
```json
{
  "id": "1234567890",
  "user_id": "user123",
  "user_email": "user@example.com",
  "user_phone": "+380123456789",
  "items": [...],
  "totalItemCount": 5,
  "delivery_type": "Standard",
  "delivery_type_cost": 250,
  "cost_before_delivery_rate": 10000,
  "cost_after_delivery_rate": 10250,
  "promo_code": "",
  "contact_number": "+380123456789",
  "ip_address": "192.168.1.1",
  "createdAt": "2023-12-01T10:00:00.000Z"
}
```

## Локальне зберігання

Дані зберігаються в `localStorage` браузера:
- `users` - масив користувачів
- `user` - поточний користувач
- `orders` - масив замовлень

## IP адреса

IP адреса отримується через API `https://api.ipify.org?format=json` при оформленні замовлення.