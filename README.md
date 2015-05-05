### Sandbox for getting from React to Reflux

Disclaimers:

- This code shouldn't be considered production ready.
- Still WIP.
- Consists of code that 'recreates the wheel'.

## It's my attempt to reproduce the path of Reflux creation.

I find [Flux](https://github.com/facebook/flux) a good architecture that
makes complicated interactions between UI components as clear as possible.
And I think, [Reflux](https://github.com/spoike/refluxjs) is good
implementation of this concept. But it's hard to grasp the whole thing by
reading docs so I decided to find an organic way to understand the motives
of its creators.

Consider the following implementation as the proper one: https://github.com/spoike/refluxjs-todo.

#### Dependencies

- `Python 2.7+`
- `virtualenvwrapper`
- `npm`

#### Install & Running

```
mkvirtualenv toy-todo
pip isntall -r requirements.txt
npm install
./node_modules/.bin/gulp
gunicorn  --pythonpath app server:app --log-file=-
```

#### TODO

- 'Mark all as done' action
- Reorder the items


