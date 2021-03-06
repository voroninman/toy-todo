import os
from flask import Flask, render_template, session
from flask.ext.restful import Api
from api import TodoResource, TodoListResource, OrderResource

app = Flask(__name__, static_folder='../public/')
app.secret_key = os.environ.get('SECRET_KEY', '!this_is_110%_SECRET_key')
app.debug = os.environ.get('DEBUG')

api = Api(app)

@app.route('/')
def homepage():
    if 'todo' not in session:
        session['todo'] = []
    return render_template('index.html', todos=session['todo'])

@app.route('/<path:path>')
def static_proxy(path):
    # For Heroku needs
    return app.send_static_file(path)

api.add_resource(TodoListResource, '/todo')
api.add_resource(TodoResource, '/todo/<string:todo_id>')
api.add_resource(OrderResource, '/order')

if __name__ == '__main__':
    app.run(static_files={'/': '../public'})
