import streamlit as st
import pickle 
import pandas as pd

st.title('Movie Recommendation System')
movies_dict = pickle.load(open('movie_dict.pxl', 'rb'))
movies = pd.DataFrame(movies_dict)

similarity = pickle.load(open('similarity.pxl','rb'))


def recommend(movie):
    movie_index = movies[movies['title'] == movie].index[0]
    distances = similarity[movie_index]
    movies_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:11]
    
    recommended_movies=[]
    for i in movies_list:
        recommended_movies.append(movies.iloc[i[0]].title)
    
    return recommended_movies

# Dropdown Menu 
selected_movie_name = st.selectbox(
    'Which Movie do you Like? Select it:' ,movies['title'].values)


if st.button('Recommend'):
    recommendations = recommend(selected_movie_name)
    st.write(f"### Top 10 Movies similar to '{selected_movie_name}'")

    for movie in recommendations:
        st.write(f"- {movie}")
