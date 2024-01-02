import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext()
const CartDispatchContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':

      // if size is same as earlier than update otherwise create new

      let found=false
      let updState=[]

      state.forEach((item)=>{
        if((item.name===action.payload.name)&&(item.size===action.payload.size)){
          item.qty=parseInt(item.qty)+ parseInt(action.payload.qty)  
          updState=state
          found=true
        }
      })

      if(found){
        return updState
      }

      return [...state, {
        id: action.payload.id,
        img: action.payload.img,
        name: action.payload.name,
        price: action.payload.price,
        qty: action.payload.qty,
        size: action.payload.size,
        date:action.payload.date
      }]
    
    case 'REMOVE':
      const newState=state.filter((item)=>item.id!==action.payload.id)
      return newState

    default:
      console.log('error in reducer')
  }
}

export const ContextReducer = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, [])

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
}

export const useCart = () => useContext(CartStateContext)
export const useDispatch = () => useContext(CartDispatchContext)
