# 🍔 HMBurger — Food Delivery Web App


**Hot. Fresh. Fast. Always. 🚀**

A modern, fully responsive food delivery web application built with React 18 + Tailwind CSS v4 featuring glassmorphism UI, WhatsApp order integration, and dark/light theme support.

[🔴 Live Demo](https://hmburger-byy-harsh-and-monu.netlify.app) &nbsp;&nbsp;|&nbsp;&nbsp; 


---


## ✨ Features⭐️

- 🎠 **Animated Banner Slider** — Auto-slide every 3.5s with touch swipe support for mobile
- 🔍 **Live Search** — Real-time food filtering as you type (no API calls)
- 🗂️ **Category Filters** — Burger, Pizza, Drinks, Fries, Chinese, Combo + Veg/Non-Veg toggle
- 🛒 **Cart Management** — Add, remove, quantity control with localStorage persistence
- ❤️ **Wishlist** — Heart-toggle on any food card, persists across sessions
- 🎟️ **Coupon Codes** — `FIRST50` (50% off) · `SAVE25` (25% off ₹400+) · `SAVE10` (10% off ₹200+)
- 📲 **WhatsApp Orders** — Place order directly via WhatsApp with formatted order message
- ⏱️ **Delivery Timer** — Countdown timer after order placement (10–20 mins)
- ⭐ **Feedback System** — Star rating + review after delivery, saved to localStorage
- 📊 **Dashboard** — Order statistics with interactive Recharts LineChart
- 🌙 **Dark / Light Theme** — System preference detection + manual toggle + localStorage save
- 💎 **Glassmorphism UI** — Frosted glass cards, gradient backgrounds, smooth animations
- 📱 **Mobile First** — Dedicated bottom navigation bar for mobile devices

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Frontend Framework | React 18 |
| Styling | Tailwind CSS v4 |
| Build Tool | Vite 5 |
| Package Manager | Bun |
| Routing | React Router DOM v6 |
| Animations | Framer Motion |
| Charts | Recharts |
| Icons | Lucide React |
| Deployment | Netlify |

---

## 📁 Project Structure

```
hmburger/
├── public/
│   └── _redirects          # Netlify SPA routing fix
├── src/
│   ├── assets/
│   │   ├── banner.jpg
│   │   ├── banner2.jpg
│   │   └── banner3.png
│   ├── components/
│   │   ├── Navbar.jsx       # Top nav + mobile bottom nav
│   │   ├── Banner.jsx       # Auto-sliding carousel
│   │   ├── Categories.jsx   # Category filters + Veg/Non-Veg pills
│   │   ├── FoodCard.jsx     # Glassmorphism food card
│   │   ├── Footer.jsx       # Brand footer
│   │   ├── Toast.jsx        # Cart add notification
│   │   └── Skeleton.jsx     # Loading placeholder
│   ├── context/
│   │   ├── CartContext.jsx      # Cart state + localStorage
│   │   ├── WishlistContext.jsx  # Wishlist state + localStorage
│   │   ├── ThemeContext.jsx     # Dark/light theme
│   │   └── SearchContext.jsx    # Global search query
│   ├── data/
│   │   ├── foods.js         # 22+ food items
│   │   └── dashboardData.js # Chart data
│   ├── pages/
│   │   ├── Home.jsx         # Landing page
│   │   ├── Cart.jsx         # Cart + order + timer + feedback
│   │   ├── Wishlist.jsx     # Saved items
│   │   └── Dashboard.jsx    # Order stats chart
│   ├── App.jsx              # Routes + layout
│   ├── main.jsx             # Entry point
│   └── index.css            # Tailwind + glassmorphism CSS vars
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Bun](https://bun.sh) installed:

```bash
curl -fsSL https://bun.sh/install | bash
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/rockmonu-45/hmburger.git
cd hmburger

# 2. Install dependencies
bun install

# 3. Start development server
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
bun run build
```


---

## 🎟️ Coupon Codes

| Code | Discount | Minimum Order |
|---|---|---|
| `FIRST50` | 50% OFF | No minimum |
| `SAVE25` | 25% OFF | ₹400+ |
| `SAVE10` | 10% OFF | ₹200+ |

---

## 📱 Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Banner, category filters, food grid |
| `/cart` | Cart | Cart items, coupons, WhatsApp order |
| `/wishlist` | Wishlist | Saved favourite food items |
| `/dashboard` | Dashboard | Order statistics chart |

---

## 🍔 Food Menu Categories

The app includes **22+ food items** across 6 categories:

- 🍔 **Burger** — Classic, Cheese, Double Patty, Veggie, Chicken, Spicy, Grilled, Paneer, BBQ, Mushroom
- 🍕 **Pizza** — Margherita, Farmhouse, Pepperoni, Paneer, BBQ Chicken
- 🍟 **Fries** — French Fries, Cheese Fries
- 🥤 **Drinks** — Coca Cola, Pepsi
- 🍜 **Chinese** — Hakka Noodles, Chilli Chicken
- 🍱 **Combo** — Burger Combo, Chicken Combo

---

## ⚙️ How WhatsApp Orders Work

1. User adds items to cart
2. Optionally applies a coupon code
3. Clicks **"Place Order"** → enters name + table number
4. Clicks **"Send via WhatsApp"**
5. WhatsApp opens with a pre-filled formatted order message
6. User sends message to the restaurant
7. Countdown timer starts (10–20 minutes)
8. After delivery → feedback/rating screen appears

---

## 🌙 Dark / Light Theme

The theme system:
- Reads saved preference from `localStorage` on load
- Falls back to system `prefers-color-scheme` if no saved preference
- Toggles the `dark` class on `<html>` (Tailwind v4 class strategy)
- Saves new preference to `localStorage` on toggle

---

## 🔧 Netlify Deployment

The `public/_redirects` file handles SPA routing on Netlify:

```
/* /index.html 200
```

This ensures direct URL access to `/cart`, `/wishlist`, `/dashboard` works correctly without 404 errors.

---

## 💾 localStorage Keys

| Key | Description |
|---|---|
| `cart` | JSON array of cart items with quantities |
| `wishlist` | JSON array of wishlisted food items |
| `theme` | `"dark"` or `"light"` preference string |
| `feedbacks` | JSON array of rating + comment objects |

---

## 👨‍💻 Developers

<table>
  <tr>
    <td align="center">
      <b>Monu</b><br/>
      <a href="https://github.com/rockmonu-45">@rockmonu-45</a>
    </td>
    <td align="center">
      <b>Harsh Singhal</b><br/>
      BCA 6th Semester
    </td>
  </tr>
</table>

**Manorama Institute of Management and Technology, Agra**
**Dr. Bhimrao Ambedkar University, Agra | BCA 6th Semester | 2023–2026**

---

## 📄 License

This project is built for academic purposes as a BCA 6th Semester project.

---

<div align="center">

Made with ❤️ by **Harsh** & **Monu** &nbsp;•&nbsp; © 2026 HMBurger. All rights reserved.

</div>
