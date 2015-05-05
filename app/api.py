from uuid import uuid4
from flask import session, request, abort
from flask.ext.restful import Resource


def session_lookup(todo_id):
    find = lambda item: item['id'] == todo_id
    try:
        return list(filter(find, session['todo']))[0]
    except IndexError:
        return None


class TodoResource(Resource):

    def get(self, todo_id):
        todo = session_lookup(todo_id)
        if todo is None:
            abort(404)
        return todo


    def put(self, todo_id):
        session_todo = session_lookup(todo_id)
        if session_todo is None:
            abort(404)
        todo = request.json
        todo['id'] = todo_id
        session['todo'][session['todo'].index(session_todo)] = todo
        return todo


class TodoListResource(Resource):

    def patch(self):
        if 'todo' not in session:
            session['todo'] = []
        diff = request.json
        for todo in session['todo']:
            todo.update(diff)
        return None, 204

    def get(self):
        if 'todo' not in session:
            session['todo'] = []
        return session['todo']

    def post(self):
        if 'todo' not in session:
            session['todo'] = []
        todo_id = str(uuid4())
        todo = request.json
        todo['id'] = todo_id
        session['todo'].append(todo)
        return todo

