from flask import Flask, render_template, request, jsonify
import pandas as pd
import numpy as np
from model import train_model, predict_spam
import os
from datetime import datetime
import json

app = Flask(__name__)

# Global variables to store statistics
stats = {
    'total_analyzed': 0,
    'spam_detected': 0,
    'legitimate_detected': 0,
    'last_trained': None,
    'model_accuracy': 0.0
}

@app.route('/')
def home():
    return render_template('index.html', stats=stats)

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        if 'email_content' not in request.form:
            return jsonify({'error': 'No email content provided'}), 400
            
        email_content = request.form['email_content']
        if not email_content.strip():
            return jsonify({'error': 'Email content cannot be empty'}), 400
            
        prediction, confidence = predict_spam(email_content)
        
        # Update statistics
        stats['total_analyzed'] += 1
        if prediction == 1:
            stats['spam_detected'] += 1
        else:
            stats['legitimate_detected'] += 1
            
        return jsonify({
            'prediction': int(prediction),
            'confidence': float(confidence),
            'stats': stats
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/train', methods=['POST'])
def train():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
            
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
            
        if not file.filename.endswith('.csv'):
            return jsonify({'error': 'Please upload a CSV file'}), 400
            
        # Save the uploaded file temporarily
        temp_path = 'temp_dataset.csv'
        file.save(temp_path)
        
        # Train the model
        accuracy = train_model(temp_path)
        
        # Update statistics
        stats['last_trained'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        stats['model_accuracy'] = accuracy
        
        # Clean up
        os.remove(temp_path)
        
        return jsonify({
            'message': 'Model trained successfully',
            'accuracy': accuracy,
            'stats': stats
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/stats')
def get_stats():
    return jsonify(stats)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/features')
def features():
    return render_template('features.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

if __name__ == '__main__':
    app.run(debug=True, port=5001) 