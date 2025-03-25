# A MOCK PROJECT
this application is served using firebase on https://shoe-store-mock.web.app/
the mock server used to serve the data is deployed on vercel with https://mock-json-server-psi.vercel.app
the endpoints include https://mock-json-server-psi.vercel.app/products
a ci/cd pipeline is also build for this application using a github workflow

- you can view the shoes available
- you can view each shoe
- you can also add each shoe to cart
- and you can remove item from the cart

*of course, there is still a lot to do - but i am not stopping!... lol*

## MANAGING STATE IN REACT
While building the application, i have learnt alot on state manaement in react
## MANAGING ROUTER STATE
- Declare routes via <Route>
- Declare and read dynamic URL placeholders
- use Link instead of html anchor tag
- handled 404s
- used the useParameter hook
- redirected using useNavigate -> handles client-side navigation programmatically

## Handling Shared, Derived and Immutable State

## Deciding where to declare the cart state since multiple components needs it. USE THE PRINCIPLE OF LEAST PRIVILEDGE
Principle of Least Priviledge - every module must be able to access only the information and resources that are necessary for its legitimate purpose.

common mistake
declaring state in the wrong spot.

KEEP STATE AS LOCAL AS POSSIBLE.

Best principles for keeping state - START LOCAL
1. declare state in the component that needs it
2. if child components need the state?. pass the state down via props.
3. if non-child components need it, then lift state to a common parent
4. BUT NOTE, TO AVOID PROP DRILLING, THEN CONSIDER CONTEXT, REDUX
![alt text](image.png)

***LIFTING STATE***

### REACT SET STATE CALLS ARE ASYNCHRONOUS
*We need to update state using existing state. So we sould use a function to set state*
react set state calls do not happen immediately
react batch calls its state.

batching improves performace by reducing re-renders
this means that if state is set multiple times in a short time period, React may batch the updates.

THEREFORE, THIS IS UNRELIABLE
const [count, setCount] = useState();
setCount(count + 1); => this is unreliable due to batching

better still
setCount((count) => count + 1)
*IT IS IMPORTANT TO TREAT STATE AS IMMUTABLE IN REACT*
#### WHY IMMUTABILITY
helps write pure functions
simpler for undo and redo
helps avoid bugs

**IF THE OLD AND NEW STATE REFERENCES THE SAME OBJECT IN MEMORY, THEN THE STATE HAS NOT CHANGED!!!**

METHODS TO COPY STATE - MAKING IT IMMUTABLE
1. Object.assign({}, state, {role:"admin"})
2. const newState = {...state, role:"admin"}
    WARNING:
        be careful, because the above does not clone nested addresses.
3. map, filter, reduce, etc
BUT ONLY CLONE WHAT CHANGES IN STATE:
- deep cloining is expensive

arrays to avoid in react
- push
- pop
- reverse

arrays to prefer
- map, filter, reduce, concat, spread

When you update state using the useState setter function (setCart), you can pass:
1. A new value → setCart(newArray)
2. A function → setCart((prevState) => newArray)

