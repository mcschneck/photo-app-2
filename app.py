'''
Nice resources:
  * https://picsum.photos/
'''
from flask import Flask, request, render_template
import fake_data
import json

app = Flask(__name__)

@app.route('/')
def home():
    current_user = fake_data.generate_user()
    return render_template(
        'index.html', 
        user=current_user,
        posts=fake_data.generate_posts(n=8),
        stories=fake_data.generate_stories(n=6),
        suggestions=fake_data.generate_suggestions(n=7)
    )


@app.route('/api/feed')
def get_feed():
    n = request.args.get('limit') or 20
    n = int(n)
    print(fake_data.generate_posts(n))
    return json.dumps(fake_data.generate_posts(n))

@app.route('/api/stories')
def get_stories():
    n = request.args.get('limit') or 5
    n = int(n)
    return json.dumps(fake_data.generate_stories(n, width=50))

@app.route('/api/suggestions')
def get_suggestions():
    n = request.args.get('limit') or 8
    n = int(n)
    return json.dumps(fake_data.generate_suggestions(n))

if __name__ == '__main__':
    app.run()