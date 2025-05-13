# Spam Mail Detector 🛡️

A machine learning-powered web application that detects spam emails using supervised learning techniques. The application uses Natural Language Processing (NLP) and a Multinomial Naive Bayes classifier to analyze email content and determine if it's spam or legitimate.

![Python](https://img.shields.io/badge/Python-3.x-blue)
![Flask](https://img.shields.io/badge/Flask-2.3.0-green)
![scikit-learn](https://img.shields.io/badge/scikit--learn-1.3.0-orange)
![NLTK](https://img.shields.io/badge/NLTK-3.8.0-yellow)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.1.3-purple)

## ✨ Features

- **Real-time Analysis**: Instantly analyze email content for spam detection
- **Machine Learning**: Uses supervised learning with Multinomial Naive Bayes
- **NLP Processing**: Advanced text processing and feature extraction
- **Modern UI**: Clean and responsive interface built with Bootstrap
- **Model Training**: Upload custom training data to improve accuracy
- **Confidence Scores**: Get probability scores for predictions
- **API Integration**: RESTful API endpoints for integration

## 🚀 Technologies Used

### Backend
- Python 3.x
- Flask (Web framework)
- scikit-learn (Machine Learning)
- NLTK (Natural Language Processing)
- pandas (Data manipulation)
- numpy (Numerical computations)
- joblib (Model persistence)

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5.1.3
- Font Awesome 6.0.0

## 📋 Prerequisites

- Python 3.x
- pip (Python package manager)
- Virtual environment (recommended)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/spam-detector.git
cd spam-detector
```

2. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Download NLTK data:
```bash
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords'); nltk.download('punkt_tab'); nltk.download('averaged_perceptron_tagger')"
```

## 🚀 Usage

1. Start the application:
```bash
python app.py
```

2. Open your browser and navigate to:
```
http://localhost:5001
```

3. To analyze an email:
   - Paste the email content in the text area
   - Click "Analyze"
   - View the results and confidence score

4. To train the model:
   - Scroll to the "Train Model" section
   - Upload a CSV file with training data
   - Click "Train Model"
   - Wait for the success message

## 📊 Training Data Format

The training data should be in CSV format with two columns:
- `text`: The email content
- `label`: 1 for spam, 0 for legitimate

Example:
```csv
text,label
"Congratulations! You've won a prize!",1
"Meeting scheduled for tomorrow",0
```

## 🧠 Machine Learning Concepts

### Supervised Learning
- Binary Classification
- Feature Engineering
- Model Selection
- Model Evaluation

### Natural Language Processing
- Text Preprocessing
- TF-IDF Vectorization
- Stop Words Removal
- Tokenization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Deep Bartaria

## 🙏 Acknowledgments

- scikit-learn documentation
- NLTK documentation
- Flask documentation
- Bootstrap documentation

## 📞 Support

If you have any questions or need help, please open an issue in the GitHub repository. 
