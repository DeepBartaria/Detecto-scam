import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import re

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')
try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

# Initialize the vectorizer and model
vectorizer = TfidfVectorizer(max_features=5000)
model = MultinomialNB()

def preprocess_text(text):
    """Preprocess the text for analysis."""
    # Convert to lowercase
    text = text.lower()
    
    # Remove special characters and digits
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    
    # Tokenize
    tokens = word_tokenize(text)
    
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token not in stop_words]
    
    # Join tokens back into text
    return ' '.join(tokens)

def train_model(dataset_path):
    """Train the spam detection model."""
    try:
        # Read the dataset
        df = pd.read_csv(dataset_path)
        
        # Preprocess the text
        df['processed_text'] = df['text'].apply(preprocess_text)
        
        # Split the data
        X_train, X_test, y_train, y_test = train_test_split(
            df['processed_text'], df['label'], test_size=0.2, random_state=42
        )
        
        # Transform the text data
        X_train_tfidf = vectorizer.fit_transform(X_train)
        X_test_tfidf = vectorizer.transform(X_test)
        
        # Train the model
        model.fit(X_train_tfidf, y_train)
        
        # Make predictions on test set
        y_pred = model.predict(X_test_tfidf)
        
        # Calculate accuracy
        accuracy = accuracy_score(y_test, y_pred)
        
        # Save the model and vectorizer
        joblib.dump(model, 'spam_model.joblib')
        joblib.dump(vectorizer, 'vectorizer.joblib')
        
        return float(accuracy)
        
    except Exception as e:
        print(f"Error during model training: {str(e)}")
        raise

def predict_spam(text):
    """Predict if the given text is spam."""
    try:
        # Load the model and vectorizer if they exist
        try:
            model = joblib.load('spam_model.joblib')
            vectorizer = joblib.load('vectorizer.joblib')
        except:
            raise Exception("Model not trained yet. Please train the model first.")
        
        # Preprocess the text
        processed_text = preprocess_text(text)
        
        # Transform the text
        text_tfidf = vectorizer.transform([processed_text])
        
        # Make prediction
        prediction = model.predict(text_tfidf)[0]
        
        # Get prediction probability
        proba = model.predict_proba(text_tfidf)[0]
        confidence = proba[1] if prediction == 1 else proba[0]
        
        return prediction, confidence
        
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        raise 