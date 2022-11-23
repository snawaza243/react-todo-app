import React, { useEffect, useState } from 'react'
import './ToDoApp.css'

// save data locally
const getLocalData = () => {
  const lists = localStorage.getItem('ToDoApp')
  if (lists) {
    return JSON.parse(lists)
  } else {
    return []
  }
}






const ToDo = () => {
  const [inputData, setInputData] = useState('')
  const [items, setItems] = useState(getLocalData())
  const [isEditItem, setIsEditItem] = useState('')
  const [toggleButton, setToggleButton] = useState(false)

  document.title = 'ToDo App'

  // Convert text into sentence case
  function sentenceCase (str) {
    if (str === null || str === '') return false
    else str = str.toString()
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }

  // item add function
  const addItem = () => {
    if (!inputData) {
      alert('Enter items then add.')
    } else if (inputData && toggleButton) {
      setItems(
        items.map(curElem => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputData }
          }
          return curElem
        })
      )
      setInputData('')
      setIsEditItem(null)
      setToggleButton(false)
      
    } else {
      const NewInputData = {
        id: new Date().getTime().toString(),
        name: inputData
      }
      setItems([...items, NewInputData])
      setInputData('') //clear input add item
    }
  }

  // edit item
  const editItem = index => {
    const editedItem = items.find(curElem => {
      return curElem.id === index
    })
    setInputData(editedItem.name)
    setIsEditItem(index)
    setToggleButton(true)
  }

  // delete item function
  const deleteItem = index => {
    const updatedItem = items.filter(curElem => {
      return curElem.id !== index
    })
    setItems(updatedItem)
  }
  //clear all items
  const removeAll = () => {
    setItems([])
  }

  // data store in local storage
  useEffect(() => {
    localStorage.setItem('ToDoApp', JSON.stringify(items))
  }, [items])

  // add on click enter

  const handleKeypress = event => {
    //it triggers by pressing the enter key
    if (event.keyCode === 13) {
      addItem()
    }
  }

  // enter press even
  React.useEffect(() => {
    window.addEventListener('keypress', (event) => 
    {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementsByClassName("addBtnId").click();
      }
    }
  )
      
    });

  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
          <div className='head-hero'>
            <h3>
              To Do <br></br>Application
            </h3>
            <i className='fa fa-list fa-4x'> </i>
          </div>
          <div className='add-items'>
            <input
              title='Add items'
              type='text'
              placeholder='✒️Add items now....'
              className='form-control inputDataField'
              value={inputData}
              onChange={event => setInputData(event.target.value)}
              onKeyPress={handleKeypress}
            />
            {toggleButton ? (
              <i
                title='Save the edit'
                className='fa fa-edit add-btn add-on-click addBtnId'
                onClick={addItem}
              ></i>
            ) : (
              <i 
                title='Save the item'
                className='fa fa-plus add-btn add-on-click plus-icon addBtnId'
                onClick={addItem}
              ></i>
            )}
          </div>
          {/* show items */}
          <div className='show-item'>
            {items.map((curElem, index) => {
              return (
                <div className='each-item' key={curElem.id}>
                  <p>{sentenceCase(curElem.name)}</p>
                  <div className='todo-btn'>
                    <i
                      title='Edit this item'
                      className='fa fa-edit add-btn'
                      onClick={() => editItem(curElem.id)}
                    ></i>
                    <i
                      title='Delete this item'
                      className='fa fa-trash-alt add-btn'
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              )
            })}
          </div>

          {/* remove button */}
          <div className='show-item'>
            <button
              title='Clear All Items'
              className='btn effect04 clear-btn'
              data-sm-link-text='Remove All'
              onClick={removeAll}
            >
              <span><i class="fa fa-remove"></i></span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ToDo;