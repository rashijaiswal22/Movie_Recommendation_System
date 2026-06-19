from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app, origins=[
    "http://localhost:3000","https://aapka-netlify-app-name.netlify.app"   
    ])
# 1. Loading  ML Models/Files
try:
    movies_dict = pickle.load(open('movie_dict.pxl', 'rb'))
    movies = pd.DataFrame(movies_dict)
    similarity = pickle.load(open('similarity.pxl', 'rb'))
    print("✅ Both .pxl files loaded successfully!")
except Exception as e:
    print(f"❌ Error loading files: {e}")

# 2. Core Recommendation Algorithm
def get_recommendations(movie):
    try:
        movie_index = movies[movies['title'] == movie].index[0]
        distances = similarity[movie_index]
        movies_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:21]
        
        recommended_movies = []
        for i in movies_list:
            # Sharing React Title and ID  of movie
            recommended_movies.append({
                "id": int(movies.iloc[i[0]].movie_id),
                "title": str(movies.iloc[i[0]].title)
            })
        return recommended_movies
    except Exception as e:
        return []

# 3. API Endpoints by which react can fetch data

# Dropdown and movies list endpoint
@app.route('/api/movies', methods=['GET'])
def get_all_movies():
    movie_titles = movies['title'].values.tolist()
    return jsonify(movie_titles)

# Endpoint for Recommendation 
@app.route('/api/recommend', methods=['POST'])
def recommend():
    data = request.json
    selected_movie = data.get('movie')
    
    if not selected_movie:
        return jsonify({"error": "No movie selected"}), 400
        
    recommendations = get_recommendations(selected_movie)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True, port=5000) # Server run on localhost:5000 