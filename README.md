# 🏨 HotelHub — Hotel Management System

A modern hotel management web application built with **React**, **Redux Toolkit**, **React Router**, and **Vite**.

## ✨ Features

- 📋 View all hotels with search, filter & pagination
- ➕ Add new hotels
- ✏️ Edit existing hotel details
- 🗑️ Delete hotels with confirmation modal
- 📄 Hotel detail pages
- 💰 Price range filtering
- 🔍 Real-time search

## 🛠️ Tech Stack

- **React 18**
- **Redux Toolkit** — state management
- **React Router v6** — routing
- **Vite** — build tool
- **Lucide React** — icons

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Installation & Running

```bash
# 1. Clone the repository
git clone https://github.com/kishoreS-arch/hotelmanagement.git

# 2. Navigate into the project folder
cd hotelmanagement

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open your browser at **http://localhost:3000**

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
hotel-list-app/
├── public/
│   └── images/          # Hotel images
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components (HotelList, AddHotel, EditHotel, HotelDetails)
│   ├── redux/           # Redux store & slices
│   ├── routes/          # App routing
│   ├── services/        # API service layer
│   ├── utils/           # Utility functions (validation, etc.)
│   ├── data/            # Mock hotel data
│   └── App.jsx          # Root component
├── index.html
├── vite.config.js
└── package.json
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
