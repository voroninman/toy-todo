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


    def patch(self, todo_id):
        session_todo = session_lookup(todo_id)
        if session_todo is None:
            abort(404)
        diff = request.json
        session['todo'][session['todo'].index(session_todo)].update(diff)
        return None, 204


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
        todo = request.json
        todo['id'] = str(uuid4())
        del todo['tmpId']
        session['todo'].insert(0, todo)
        return todo


class OrderResource(Resource):

    def post(self):
        if 'todo' not in session:
            session['todo'] = []
        try:
            old_idx, new_idx = request.json['old'], request.json['new']
        except KeyError:
            abort(400)
        item = session['todo'].pop(old_idx)
        session['todo'].insert(new_idx, item)
        return None, 204
