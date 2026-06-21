# 🎬 Movie Recommendation System

A Full-Stack Machine Learning application that recommends 20 similar movies based on a user's selection using Content-Based Filtering and Cosine Similarity. Built with React.js, Flask, and Scikit-Learn, and deployed using Netlify and Hugging Face Spaces.

## 🚀 Live Demo
**Frontend** : [https://movie-recommendation-ml.netlify.app/]
**Backend API** : [https://rashijaiswal20-movie-recommender-backend.hf.space]

## 🛠️ Tech Stack
### **Frontend**
* **React.js & JavaScript (ES6)** - For building a dynamic and responsive user interface.
* **Axios** - For seamless asynchronous API communication with the Flask backend and TMDB.
* **HTML5, CSS3, Bootstrap** - For clean layout and responsive design.

### **Backend & Machine Learning**
* **Python & Flask** - Created a secure REST API to handle live recommendation requests.
* **Scikit-Learn** - Computed `cosine_similarity` matrices for movie feature evaluation.
* **Pickle** - Loads pre-trained datasets (`movie_dict.pxl`, `similarity.pxl`) directly into memory for instant inference.

### **DevOps & Cloud Deployment**
* **Docker** - Containerized the backend microservice to ensure environment consistency.
* **Hugging Face Spaces** - Deployed the heavy ML container leveraging its high-memory infrastructure (16GB RAM).
* **Netlify** - Hosted the frontend application for fast, continuous delivery.
* **TMDB API** - Integrated to dynamically fetch metadata and movie posters in real-time.

## 📌 Features
* Recommend 20 similar movies instantly
* Content-based recommendation engine
* Real-time movie posters using TMDB API
* Responsive user interface
* REST API-based architecture
* Dockerized backend deployment

## ⚙️ How It Works (Data Pipeline)

1. **Data Preprocessing & Feature Engineering:** 
   * Cleaned the raw dataset of 5,000+ movies by removing null entries and duplicates.
   * Merged separate metadata columns (`genres`, `keywords`, `cast`, `crew`, `overview`) into a single structural `tags` column.
   * Applied lowercase conversion and **Stemming** (via NLTK) to eliminate duplicate word roots.
2. **Vectorization & Similarity Scoring:** 
   * Transformed the text data into multi-dimensional vectors using text vectorization.
   * Computed a comprehensive **Cosine Similarity Matrix** to measure structural closeness between movies.
3. **API Execution Flow:**
   * The React client sends the user's selected movie to the Flask server.
   * The server loads the pre-trained data using **Pickle** files, maps the similarity indices, and computes the top 20 matches instantly.
   * The client receives the movie titles and fetches the corresponding graphical poster paths directly via the **TMDB API**.

## 📊 Dataset & Model
* Dataset containing 5,000+ movies
* Data preprocessing using Python and NLTK
* Feature engineering using genres, keywords, cast, crew, and overview
* Similarity matrix generated using Scikit-Learn
* Pre-trained model stored using Pickle (.pkl)

## 🏗 Architecture
```text
User
  ↓
React Frontend
  ↓
Flask REST API
  ↓
Recommendation Model (.pkl)
  ↓
Cosine Similarity Engine
  ↓
TMDB API
  ↓
Movie Recommendations + Posters
```

## 💻 Local Setup
Follow these steps to run the project locally on your machine:
### 1. Clone Repository
```bash
git clone https://github.com/rashijaiswal22/Movie_Recommendation_System.git
cd Movie_Recommendation_System
```

# 2. Backend Setup
```
cd backend
pip install -r requirements.txt
python app.py
```

# 3. Frontend Setup
```
cd frontend
npm install
npm start
```

## 🔮 Future Improvements
* Personalized Recommendations
* Hybrid Recommendation System
* User Authentication
* Watchlist Feature
* Movie Search & Filtering
