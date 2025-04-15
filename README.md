# 🌱 Bonsai

<div align="center">
  <img src="./frontend/src/assets/images/readme/logo_brand.png" alt="Bonsai Logo" width="250" height="250">
</div>
<br><br><br>

Welcome to **Bonsai**, a full-stack web application that offers a seamless
eCommerce experience for bonsai enthusiasts. The platform allows users to
browse, purchase, and explore curated bonsai plants, accessories, and
information.

Bonsai combines cutting-edge technology with a tranquil design to create the
ultimate platform for bonsai lovers. <br><br>

## 🌐 Live Demo

Check out the live version of the app:
**[www.mwbonsai.com](https://www.mwbonsai.com)**.

---

<br>

## 🚀 Built With

### **Frontend**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![React Three Fiber](https://img.shields.io/badge/React%20Three%20Fiber-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

### **Backend**

![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Django REST Framework](https://img.shields.io/badge/Django%20REST%20Framework-092E20?style=for-the-badge&logo=django&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

### **Third-Party APIs**

![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![Google Maps](https://img.shields.io/badge/Google%20Maps-4285F4?style=for-the-badge&logo=google-maps&logoColor=white)
![Echo3D](https://img.shields.io/badge/Echo3D-14A3E4?style=for-the-badge&logo=echo3d&logoColor=white)
![Haystack](https://img.shields.io/badge/Haystack-00C7B7?style=for-the-badge&logo=haystack&logoColor=white)
![OpenWeather](https://img.shields.io/badge/OpenWeather-FA5B0F?style=for-the-badge&logo=openweather&logoColor=white)
![Zen Quotes API](https://img.shields.io/badge/Zen%20Quotes%20API-3C8068?style=for-the-badge&logo=leaflet&logoColor=white)
![Google Vision API](https://img.shields.io/badge/Google%20Vision%20API-4285F4?style=for-the-badge&logo=google&logoColor=white)

---

<br>

## 🎯 Features

- 📱 **Responsive Design:** Built with React and styled using Chakra UI for a
  beautiful and intuitive user experience across both mobile and desktop
  devices.
- 🛒 **Interactive Components:** Includes an elegant shopping cart, dynamic
  product filtering, and search functionality.
- 💳 **PayPal API:** Secure payment API integration.
- 🧘 **Zen Quotes API:** Generate inspirational quotes on demand.
- 🤖 **OpenAI API:** For an intelligent chatbot experience.
- ☁️ **Weather API:** To check local conditions for optimal bonsai care.
- 📍 **Location Services:** Integration with Google Maps API to find nearby
  bonsai nurseries, gardens, and stores.
- 🌿 **3D and Augmented Reality:** View and manipulate bonsai plants in 3D and
  Augmented Reality using Three.js, React Three Fiber.
- 📝 **Blog Integration:** Create, Read, and interact with blog posts from other
  users.
- 🛠️ **Django-Powered Backend:** A robust and secure API backend built with
  Django and Django REST Framework.
- 🖼️ **Image Management:** Efficient handling of product and user-uploaded
  images using AWS S3.
- 🔐 **Authentication:** Secure user authentication and authorization powered by
  JWT. <br><br><br>

## 🛠 Installation & Setup

## 📌 Prerequisites

Before setting up the project, ensure you have the following installed:

### **Frontend Prerequisites:**

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)

### **Backend Prerequisites:**

- [Python 3.9+](https://www.python.org/downloads/)
- [PostgreSQL 13+](https://www.postgresql.org/download/)
- [Virtual Environment (`venv`)](https://docs.python.org/3/library/venv.html)
- [AWS CLI (for S3 integration)](https://aws.amazon.com/cli/)

---

### **Clone the Repository**

```bash
git clone https://github.com/mikhail-w/bonsai.git
cd bonsai
```

### **Frontend Setup**

```bash
cd frontend
npm install
npm run dev
```

### **Backend Setup**

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### **Setup Database**

```bash
sudo -u postgres psql
CREATE DATABASE bonsai_store;
CREATE USER postgres WITH PASSWORD 'password';
ALTER USER postgres WITH SUPERUSER CREATEROLE CREATEDB;
```

### **Apply Migrations & Load Data**

```bash
python manage.py makemigrations
python manage.py migrate
```

**Important Note on Data Loading Order:**
When loading fixtures, you must follow this specific order to maintain referential integrity:

```bash
# First load users (since other models depend on them)
python manage.py loaddata users.json

# Then load products
python manage.py loaddata products.json

# Then load posts
python manage.py loaddata posts.json

# Then load reviews (which depend on users and products)
python manage.py loaddata reviews.json

# Finally load comments (which depend on users and posts)
python manage.py loaddata comments.json
```

**Note:** If you encounter foreign key constraint errors, ensure that the user IDs in your fixture files match the actual user IDs in your database. The reviews.json file should only reference user IDs that exist in your users.json file.

### **Run the Server**

```bash
python manage.py runserver
```

---

## 📂 Environment Variables

Ensure you configure your environment variables for both the **frontend** and
**backend**.

### **Frontend (`.env` in `frontend/`)**

```env
VITE_API_URL=your_backend_api_url
VITE_WEATHER_API_KEY=your_open-weather_api_key
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_GOOGLE_CLOUD_VISION_API_KEY=your_google_cloud_vision_api_key
VITE_S3_BUCKET=your_s3_bucket_name
VITE_S3_REGION=your_s3_region
VITE_S3_PATH=your_s3_bucket_path
VITE_API_BASE_URL=your_api_base_url
```

### **Backend (`.env` in `backend/`)**

```env
OPENAI_API_KEY=your_openai_api_key
DJANGO_SECRET_KEY=your_django_secret_key
DJANGO_ALLOWED_HOSTS=your_django_allowed_hosts
DJANGO_DEBUG=True
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=bonsai_store
DB_HOST=localhost
DB_PORT=5432
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_STORAGE_BUCKET_NAME=your_storage_bucket_name
AWS_S3_REGION_NAME=your_storage_bucket_region
AWS_S3_CUSTOM_DOMAIN=your_s3_custom_domain
```

---

### Notes:

1. Replace all `your_*` placeholders with your actual keys, secrets, and URLs.
2. Ensure `.env` files are **excluded from version control** by adding them to
   `.gitignore`.
3. Use different values for development and production environments as needed.
   <br><br><br>

## 🚀 Deployment

- ☁️ **Cloud Hosting:** Hosted on **AWS** with **S3** for frontend assets and
  **EC2 instances in private subnets** for the backend.
- 🚀 **CloudFront CDN:** Delivers cached frontend assets globally for faster
  performance.
- 🌎 **Domain & SSL:** Managed via **AWS Route 53**, **AWS Certificate Manager
  (SSL/TLS)**, and protected by **AWS WAF** for security.
- 🔄 **Load Balancing & Auto Scaling:** Uses **Application Load Balancer (ALB)**
  to distribute traffic and an **Auto Scaling Group** for backend EC2 instances.
- 🗄️ **Database:** **Amazon RDS (PostgreSQL)** deployed in private subnets with
  **Multi-AZ replication** for high availability.
- 🔐 **Security:** Backend is deployed in **private subnets** with NAT gateway
  access, ensuring security and controlled internet exposure.
- 📦 **Backend Hosting:** **Gunicorn & Nginx** serve the Django backend
  efficiently inside EC2 instances.
- 🔄 **CI/CD Pipeline:** Automated deployments using **GitHub Actions**.

### **AWS 3 Tier Architecture Diagram**

<div align="center">
  <img src="./frontend/src/assets/images/readme/mwbonsai_architecture.png" alt="Chatbot Integration" width="80%">
</div>
   <br><br><br>

## 📷 Preview

### **Demo**

![Demo](./frontend/src/assets/images/readme/readme001.gif)

### **User Dashboard**

#### Light Mode

<div align="center">
  <img src="./frontend/src/assets/images/readme/readme007.png" alt="User Dashboard (Light Mode)" width="80%">
</div>

#### Dark Mode

<div align="center">
  <img src="./frontend/src/assets/images/readme/readme008.png" alt="User Dashboard (Dark Mode) " width="80%" >
</div>

### **Advanced 3D Model Interactions**

<div align="center">
  <img src="./frontend/src/assets/images/readme/readme009.png" alt="Advanced 3D Model Interactions" width="80%">
</div>

### **Google Maps Integration**

<div align="center">
  <img src="./frontend/src/assets/images/readme/readme0010a.png" alt="Google Maps Integration" width="80%">
</div>

### **Blog Integration**

<div align="center">
  <img src="./frontend/src/assets/images/readme/readme0010b.png" alt="Google Maps Integration" width="80%">
</div>

### **Plant and Image Identification**

<div align="center">
  <img src="./frontend/src/assets/images/readme/readme0011.png" alt="Plant Identification" width="80%">
</div>

### **View Bonsai in Augmented Reality**

<div align="center">
  <img src="./frontend/src/assets/images/readme/readme0012.png" alt="Augmented Reality" width="80%">
</div>

### **Chatbot Integration**

<div align="center">
  <img src="./frontend/src/assets/images/readme/readme0013.png" alt="Chatbot Integration" width="80%">
</div>

---

<br><br>

## 🤝 Contribution

- 🛠️ **Fork the Repository:** Start by forking the project on GitHub.
- 🌿 **Create a Branch:** Create a new branch for your feature or bug fix:
  ```bash
  git checkout -b feature/your-feature-name
  ```
- 💡 **Commit:** Commit your changes and push them to your fork.
- 🔄 **Create a Pull Request:** Open a pull request..

---

## 📜 License

📝 **MIT License** – This project is licensed under the
[MIT License](./LICENSE).

---

## Acknowledgments

Special thanks to the team and contributors who made this project possible!

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/GD757">
        <img src="https://avatars.githubusercontent.com/GD757" width="100px;" alt="Gary"/>
        <br />
        <sub><b>Gary Dunnington</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/DustinV1976">
        <img src="https://avatars.githubusercontent.com/DustinV1976" width="100px;" alt="Dustin"/>
        <br />
        <sub><b>Dustin Siebold</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/dp1p">
        <img src="https://avatars.githubusercontent.com/dp1p" width="100px;" alt="Daniel"/>
        <br />
        <sub><b>Daniel Phanachone</b></sub>
      </a>
    </td>
  </tr>
</table>
